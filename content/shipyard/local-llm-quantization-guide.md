---
title: "The No-Nonsense Guide to Local LLM Quantization"
description: "A plain-English guide to GGUF, AWQ, EXL2, MLX, GPTQ, bitsandbytes, and choosing the right local LLM file for your hardware."
section: shipyard
type: build-guide
date: "2026-05-06"
tags: [local-ai, local-llm, quantization, gguf, vram, hugging-face, ai-hardware]
status: complete
---

If you’ve ever opened a model page on Hugging Face and been hit with a wall of files like these:

```text
Llama-3.1-8B-Instruct-Q4_K_M.gguf
model-4bit-AWQ
exl2-5.0bpw
mlx-4bit
```

Congratulations. You’ve found the quantization zoo.

It is confusing. The names look like serial numbers off a spaceship part, and most explanations assume you already know what half the letters mean.

I am learning this with the rest of you, but I wanted to write the guide I wish I had when I first started poking around local models.

By the end, you should know what the common file names mean, how much RAM or VRAM they need, and which one to download for your hardware.

## What quantization actually is

Imagine a recipe that calls for `1.7384926 cups of flour`.

Technically precise. Not very useful.

In real life, you would round that to “about 1¾ cups” and the cookies would probably turn out fine.

Large language models are made of billions of numbers called weights or parameters. Those numbers are what the model uses to “think.” By default, they are often stored in high precision, usually 16 bits per number.

That precision is nice mathematically, but a lot of it is wasted for inference. The model usually does not need to know that a weight is `0.18472619`. Something like `0.18` may be close enough.

Quantization is the process of storing those weights with fewer bits.

A 16-bit number becomes 8 bits, or 4 bits, or sometimes even less. The model gets smaller and usually faster. In exchange, you lose some quality.

The good news: the quality loss is often small until you push too far.

That is why a 4-bit version of a good model can still be very capable while using a fraction of the memory.

## The bit budget

This is the most useful math in local LLMs:

```text
memory ≈ parameters × bits per weight
```

A model’s name usually tells you how many parameters it has:

```text
7B  = 7 billion parameters
13B = 13 billion parameters
70B = 70 billion parameters
```

Then you multiply by how many bytes each parameter uses.

One byte is 8 bits.

Roughly:

```text
FP16 / BF16 = 16 bits = 2 bytes per parameter
Q8 / 8-bit  = 8 bits  = 1 byte per parameter
Q5          = 5 bits  = 0.625 bytes per parameter
Q4          = 4 bits  = 0.5 bytes per parameter
Q3          = 3 bits  = 0.375 bytes per parameter
Q2          = 2 bits  = 0.25 bytes per parameter
```

So:

```text
7B at FP16 = 7 × 2   = about 14 GB
7B at Q8   = 7 × 1   = about 7 GB
7B at Q4   = 7 × 0.5 = about 3.5 GB
```

That is the model weight size. In practice, you need extra memory for context, the KV cache, and runtime overhead.

A decent rule of thumb:

```text
Model memory in GB ≈ parameters in billions × (bits per weight ÷ 8), then add about 20%
```

So a 13B model at Q4 is:

```text
13 × 0.5 = 6.5 GB
6.5 GB + 20% overhead = about 7.8 GB
```

That is why a 13B Q4 model is the classic “fits on an 8GB GPU, barely” choice.

Barely is doing work in that sentence.

## Decoding the file names

There are a few different quantization ecosystems. Each has its own naming style.

Here are the ones you are most likely to run into.

## GGUF: the easy default

GGUF is the format used by llama.cpp, LM Studio, Ollama, Jan, KoboldCpp, and a lot of “just download this and run it” tools.

If you are new to local LLMs, GGUF is probably where you should start.

It can run on CPU, GPU, or a mix of both.

A GGUF filename might look like this:

```text
Llama-3.1-8B-Instruct-Q4_K_M.gguf
```

The important part is:

```text
Q4_K_M
```

Here’s how to read it.

The number tells you the rough number of bits per weight:

```text
Q8 = about 8-bit
Q6 = about 6-bit
Q5 = about 5-bit
Q4 = about 4-bit
Q3 = about 3-bit
Q2 = about 2-bit
```

The letter tells you the quantization strategy:

```text
_0 = older, simpler method
_1 = slightly better than _0, but still legacy
_K = K-quants, the smarter modern family
```

Most of the time, you want the K-quants.

Then there is usually a suffix:

```text
_S = small, most aggressive, smallest file, lowest quality
_M = medium, the usual sweet spot
_L = large, least aggressive, biggest file, best quality
```

So:

```text
Q4_K_M
```

means:

```text
4-bit, K-quant, medium size/quality tradeoff
```

That is the one you will see recommended constantly.

For most people, most of the time, `Q4_K_M` is the right first download.

If you have memory to spare, move up to `Q5_K_M` or `Q6_K`.

If you are tight on memory, try `IQ4_XS` before dropping below 4-bit.

## What are IQ quants?

You will also see GGUF files with names like:

```text
IQ4_XS
IQ3_M
```

These are importance-aware quants.

The idea is that the quantizer uses a calibration dataset to figure out which weights matter most, then protects those weights more carefully.

In plain English: IQ quants try to squeeze more quality out of fewer bits.

They are especially useful below 4-bit, where normal quantization starts getting rough. The tradeoff is that they may be a little slower on some hardware.

A rough quality ladder, best to worst:

```text
Q8
Q6_K
Q5_K_M
Q4_K_M
IQ4_XS
Q3_K_M
IQ3_M
Q2_K
```

Do not treat that as a law of physics. Different models and quantizers can behave differently. But as a practical starting point, it is good enough.

## GPTQ: the older GPU quant

GPTQ was one of the first popular quantization methods for local models.

It is GPU-only and usually 4-bit, though you may occasionally see 3-bit or 8-bit variants.

A GPTQ filename might look like:

```text
TheBloke/Llama-2-13B-GPTQ
gptq-4bit-32g-actorder_True
```

The parts mean:

```text
4bit = bits per weight
32g  = group size
actorder_True = quality-improving reordering trick
```

For group size, smaller is usually better quality but bigger file:

```text
32g > 64g > 128g
```

And you generally want `actorder` to be true.

GPTQ still exists, and you will still see plenty of older models in GPTQ format. But for newer GPU workflows, AWQ and EXL2 have mostly taken over.

## AWQ: the modern GPU serving favorite

AWQ stands for Activation-aware Weight Quantization.

Like GPTQ, it is GPU-only and usually 4-bit. The difference is that AWQ uses a smarter algorithm to protect the weights that matter most for activations.

The practical result: AWQ is often a bit better than GPTQ at the same size and can be faster for serving.

A filename might look like:

```text
Llama-3-8B-Instruct-AWQ
```

There is usually less to decode here. Most AWQ models are 4-bit with a 128 group size by default.

AWQ is a good choice when you have a GPU and care about serving throughput.

Common tools:

```text
vLLM
TGI
AutoAWQ
```

If you are just using LM Studio on your desktop, you probably do not need to start here.

## EXL2: the precision tuner

EXL2 is ExLlamaV2’s native format.

Its killer feature is flexibility.

Instead of being stuck with whole-number bit sizes like 4-bit or 5-bit, EXL2 lets you pick almost any bits-per-weight target:

```text
4.0 bpw
4.25 bpw
5.0 bpw
6.0 bpw
8.0 bpw
```

That means you can tune the model to fit your VRAM budget more precisely.

If a 5-bit model barely does not fit on your card, maybe 4.65 bpw does. That is the appeal.

EXL2 is GPU-only, very fast, and popular with people running models on a single 3090 or 4090 who want to squeeze the most model they can into their VRAM.

Common tools:

```text
ExLlamaV2
TabbyAPI
text-generation-webui
```

## MLX: the Apple Silicon native option

MLX is Apple’s machine learning framework.

There is now a growing ecosystem of MLX-quantized models built specifically for Macs with M-series chips.

Because Apple Silicon uses unified memory, where the CPU and GPU share the same RAM pool, MLX can be very efficient on Macs. Sometimes it is faster than llama.cpp’s Metal backend for the same model.

A filename might look like:

```text
mlx-community/Llama-3.1-8B-Instruct-4bit
```

You may see variants like:

```text
4bit
8bit
4bit-mixed
```

Common tools:

```text
MLX-LM
LM Studio
mlx_lm.server
```

If you have an M1, M2, M3, or M4 Mac, MLX is worth trying.

That said, GGUF still works well on Macs too. You do not have to use MLX just because you are on Apple Silicon.

## bitsandbytes: the Python option

bitsandbytes, often shortened to bnb, is a library rather than a file format.

Instead of downloading a pre-quantized model, you load a full Hugging Face model and quantize it on the fly.

You will see it in Python code like:

```python
load_in_4bit=True
```

or:

```python
BitsAndBytesConfig
```

bitsandbytes is useful when you are prototyping in Python, doing fine-tuning, using QLoRA, or working with a model that does not have a good pre-quantized version yet.

It is not usually the fastest inference option.

If your goal is “download a model and chat with it,” GGUF, AWQ, EXL2, or MLX will usually be a better fit.

## What quality do you actually lose?

Here is the rough quality story, assuming the same model and the same prompt.

```text
FP16 / BF16
Reference quality. Maximum size.

Q8
Almost indistinguishable from FP16 for normal use. If you have the memory, this is basically free quality.

Q6
Still very close to lossless. A great choice if you can afford it.

Q5
Small quality drop, often hard to notice.

Q4
The normal sweet spot. You may notice differences in careful side-by-side tests, but a good model remains very usable.

Q3
You start seeing more mistakes, especially with reasoning, code, and math.

Q2
Significant degradation. Use only when you have no other choice.
```

Here is the counterintuitive part:

A bigger model at a lower quant usually beats a smaller model at a higher quant.

A 13B model at Q4 will generally outperform a 7B model at Q8, even though they may use similar memory.

When in doubt, go bigger and quantize harder.

Not always. But often enough that it is a good default instinct.

## Recommendations by hardware

If you want to check what your hardware can run, I built a calculator for that:

[https://vram.portofcode.com/](https://vram.portofcode.com/)

But here are the rough recommendations.

### CPU only

Use GGUF.

It works. It will just be slower.

For a modern CPU, expect something like 2-8 tokens per second on a 7B Q4 model. Larger models get slower quickly.

Leave memory headroom. Do not fill your RAM to the edge and then wonder why the machine gets weird.

### 8GB VRAM GPU

Start with 7B or 8B models at `Q4_K_M`.

A 13B Q4 model may fit, but it will be tight once you add context and overhead.

If you crash, lower the context length before assuming the model cannot run.

### 12GB VRAM GPU

This is a much more comfortable tier.

You can run strong 8B models with headroom, and some 13B-class models at Q4 or Q5 depending on context.

This is where local models start feeling less like a trick and more like a usable tool.

### 16GB+ VRAM GPU

Now you have options.

You can push quality higher on smaller models, run larger models at Q4, or use EXL2 to tune the exact fit.

This is also where serving tools like vLLM or AWQ start making more sense if you are building something beyond personal chat.

### Apple Silicon Mac

Try MLX if there is a good MLX build of the model.

If not, use GGUF through LM Studio or llama.cpp-based tools.

Unified memory is nice, but it is not magic. Leave headroom for the OS and apps.

## Quick decision tree

If you have a Windows or Linux PC with an NVIDIA GPU and just want it to work:

```text
Use LM Studio or Ollama.
Download Q4_K_M GGUF.
Start there.
```

If you have a Mac:

```text
Try MLX 4-bit first.
Use GGUF if there is no good MLX version.
```

If you want maximum performance from a single 3090 or 4090:

```text
Use EXL2 at the highest bpw that fits.
Run it with TabbyAPI or text-generation-webui.
```

If you are serving a model to multiple users or building an app:

```text
Use AWQ with vLLM.
```

If you are fine-tuning or experimenting in Python:

```text
Use bitsandbytes with Hugging Face Transformers.
For QLoRA, bnb is the normal path.
```

If you want the best quality and have the memory:

```text
Use Q6_K GGUF or 6.0 bpw EXL2.
Do not bother with FP16 unless you are benchmarking or have a specific reason.
```

## Things that trip people up

The file size is not the memory requirement.

A 4.5 GB GGUF file may use closer to 5.5 GB once loaded with context and overhead.

Context length costs memory.

If a model fits at 4K context but crashes at 32K context, that does not mean the quant is broken. It means the working memory got bigger.

Lowering context is often the easiest fix.

Different uploaders can produce different results.

A `Q4_K_M` from one uploader is not guaranteed to feel identical to a `Q4_K_M` from another. Bartowski’s GGUFs, mradermacher’s, TheBloke’s older uploads, and others may differ in tooling, settings, or quality.

If a model feels unusually dumb, try a different quant or uploader before giving up on the model.

MoE models are weird.

Mixture of Experts models like Mixtral or DeepSeek-style architectures do not behave exactly like dense models. They have a total parameter count and an active parameter count. You still need memory for the model, but inference speed depends more on the active experts.

Do not compare them directly against dense models by parameter count alone.

## TL;DR

Quantization means storing model weights with fewer bits.

Smaller file. Lower memory use. Usually faster. Slightly less quality.

The rough math:

```text
memory ≈ parameters in billions × (bits ÷ 8), then add about 20%
```

Default pick for most people:

```text
Q4_K_M GGUF
```

If you have headroom:

```text
Q5_K_M or Q6_K
```

If you are tight:

```text
Try IQ4_XS before dropping below 4-bit
```

Format cheat sheet:

```text
GGUF = easiest general-purpose option
AWQ = GPU serving
EXL2 = precision-tuned single-GPU performance
MLX = Apple Silicon native
bitsandbytes = Python prototyping and fine-tuning
```

And the big rule:

```text
Bigger model + lower quant usually beats smaller model + higher quant.
```

Welcome to local LLMs.

If this helped, send it to the next person staring at `Q4_K_M` wondering whether they downloaded the right file.
