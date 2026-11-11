---
title: Documentation is part of the product
description: A metric without context asks every reader to do the same detective work.
date: 2026-10-15
tags: [dbt, Analytics engineering, Data]
sample: true
---
Imagine opening a dashboard and seeing “active customers.”

Active in what sense? Over which period? Are trial accounts included? Who can answer when the number looks wrong?

Without that context, the chart creates as many questions as it answers.

<figure>
  <img src="../../images/posts/seattle-library.jpg" alt="Bookshelves under the sunlit geometric glass roof of Seattle Public Library." width="1600" height="1067" loading="lazy" decoding="async" />
  <figcaption>Seattle Public Library. Photo by <a href="https://unsplash.com/photos/book-lot-on-shelf-_ar2ENzmqb0">Sylvia Yang</a> on Unsplash.</figcaption>
</figure>

## Put the definition near the work

A useful definition says what a measure includes, what it excludes, and how often it changes. It also tells a reader who owns the meaning.

In a data project, these details should travel with the models and metrics they describe. Treat the explanation as something to review when the logic changes.

## Write for a newcomer

The best test of documentation is simple: can someone who wasn’t in the original conversation use it?

- Define the business terms before the implementation details.
- Include one concrete example.
- Explain the known limitations.
- Name the person or role responsible for questions.

Longer documentation is not automatically better. A short, current explanation is often enough to unlock the next step.

## Let questions improve it

When the same question comes up twice, the documentation is giving you feedback.

Add the missing explanation where the next person will look. Over time, those small edits turn a collection of files into a more usable product.
