---
title: The best model is one someone can read
description: A few thoughts on making SQL understandable to the next person, including your future self.
date: 2026-10-24
tags: [Analytics engineering, dbt]
sample: true
---
A data model is a conversation with the next person who opens it.

That person might be a teammate trying to understand a number. It might be you, six months later, trying to remember why an exception exists.

Readable SQL gives that conversation a better starting point.

## Name the steps

A short query can still be difficult to understand. The goal isn’t the fewest lines. It’s a clear path from the inputs to the result.

```sql
with completed_orders as (
    select
        customer_id,
        order_total
    from orders
    where order_status = 'completed'
),

customer_totals as (
    select
        customer_id,
        sum(order_total) as lifetime_order_value
    from completed_orders
    group by customer_id
)

select * from customer_totals
```

This illustrative query tells you which orders count before it tells you how they are added together. The names carry some of the explanation.

## Explain the surprising parts

Comments are most useful when they explain a choice that the code cannot explain on its own.

“Sum the order totals” adds little. “Exclude cancelled orders because this measure describes fulfilled demand” gives the next reader a reason they can examine.

## Leave a useful handoff

For every model, try answering three questions:

- What does one row represent?
- Which business decision can this model support?
- What should a reader be careful about?

The answers can be short. They belong close to the model, alongside the assumptions and tests that keep it useful.

Readability is a small act of care for the people who inherit the work.
