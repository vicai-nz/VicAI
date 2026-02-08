---
layout: post.njk
title: "Workshop Recap: Building Your First LLM Application"
author: "James Nakamura"
date: 2026-01-20
tags:
  - tutorial
  - event-recap
excerpt: "A recap of our hands-on workshop where 40 students built their first LLM-powered app — from prompt design to a working prototype in three hours."
readingTime: 4
---

Last Saturday, 40 students packed into Cotton Building CO350 for our "Build Your First LLM App" workshop. The energy was brilliant. Half the room had never used an API before. By the end of the session, every team had a working prototype.

Here's what we covered and what we learned.

## The format

We structured the workshop in three phases:

1. **Concept** (45 min) — What are LLMs, how do APIs work, what is prompt engineering?
2. **Build** (90 min) — Teams of 2-3 building a working app using the Anthropic API
3. **Show & Tell** (30 min) — Each team demos their creation

No slides longer than 5 minutes. No lectures. Just enough context to get started, then hands on keyboards.

## What people built

The projects were genuinely creative. A few highlights:

- **Te Reo helper** — A conversational app that helps English speakers practice basic te reo Maori phrases, with pronunciation tips and cultural context
- **COMP102 study buddy** — An app that explains introductory programming concepts, tuned to the VUW COMP102 curriculum
- **Flatting advisor** — Answers questions about tenants' rights in NZ, pulling from the Residential Tenancies Act
- **Research paper summariser** — Takes an academic paper abstract and produces a one-paragraph summary aimed at a general audience

## Key takeaways

**Prompt engineering is more important than code.** The teams that spent the most time crafting their system prompts — being specific about tone, context, and constraints — got the best results. The actual API integration code was less than 20 lines.

**Guardrails matter from day one.** One team's flatting advisor initially gave confident but wrong legal advice. Adding explicit instructions like "if you're not sure, say so and recommend contacting Tenancy Services" dramatically improved the output. This is AI safety in practice.

**You don't need a CS degree to build with AI.** Several teams included students from non-technical backgrounds who contributed enormously — writing prompts, designing the user experience, and stress-testing the output for errors.

## Resources

If you missed the workshop and want to catch up, here are the resources we used:

- Anthropic API docs and getting started guide
- Our workshop starter template (available on our GitHub)
- The prompt engineering guide from Anthropic

## Next workshop

Our next hands-on session is **Computer Vision with PyTorch** on April 19th. This one's more technical — intermediate Python knowledge is recommended. [Check the events page](/events/) for details.

If you want to suggest a workshop topic or help run one, reach out to the Education team through our [contact page](/contact/).
