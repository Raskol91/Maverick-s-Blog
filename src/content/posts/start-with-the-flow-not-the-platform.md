---
title: Start with the flow, not the platform
description: Before choosing where the data lives, understand where it comes from and where it needs to go.
date: 2026-10-09
tags: [Microsoft Fabric, Data]
sample: true
---
An end-to-end platform can make it easy to start building. It can also make it easy to skip a difficult conversation about how the work should fit together.

Before designing a solution in Microsoft Fabric or any other data platform, sketch the flow.

<figure>
  <img src="../../images/posts/forest-river.jpg" alt="Streams meet in a dense evergreen forest, with a small footbridge crossing one branch." width="1600" height="1200" loading="lazy" decoding="async" />
  <figcaption>Three streams in a forest. Photo by <a href="https://unsplash.com/photos/birds-eye-view-of-river-and-green-trees-qYMa2-P-U0M">David Kovalenko</a> on Unsplash.</figcaption>
</figure>

## Follow one useful piece of data

Choose a real business question. Trace the information needed to answer it from its source to the person who uses it.

Write down the handoffs:

1. Where is the information first recorded?
2. Who can explain what it means?
3. Which transformations change its meaning?
4. Where does someone make a decision with it?
5. Who investigates when the answer looks wrong?

The sketch may reveal more about the design than a list of platform features.

## Name the boundaries

A technical boundary might separate raw records from a curated model. An ownership boundary might separate a source-system team from an analytics team.

Both matter. A pipeline can move data across a boundary without moving the responsibility for understanding it.

## Let the flow guide the tools

Once the flow is clear, evaluate which platform capabilities fit each step. Keep the first implementation small enough to inspect from end to end.

A useful architecture starts as an explanation. The platform gives it somewhere to run.
