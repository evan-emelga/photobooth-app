# Product

<!-- impeccable:product-schema 1 -->

Source: the Lark chat with Evan and Clara on 17 Nov 2026. No interview round ran (Lark thread, no question tool); facts marked (inferred) come from the brief only.

## Platform

web

## Stack

Mockups: static HTML/CSS/JS in `mockups/`, served by GitHub Pages. Real app later: Next.js on Vercel free tier + Neon Postgres, same as clairesbouquet.id (inferred from Evan's stack reference).

## Users

- Customers of a photo studio booking a prewedding, graduation, family/personal session, or a studio rental. Mostly on phones (inferred).
- The studio owner/admin, who has no in-house team and works with freelance MUAs, photographers, and stylists.
- Freelancers do not log in. Admin fills their availability and sends jobs over WhatsApp.

## Product Purpose

One website for a photo studio: booking, scheduling of rooms and freelancers, payment status, and digital photo delivery. Success: no more booking by Instagram DM, no double-booked rooms or freelancers, and less admin chasing of payments.

## Positioning

Customers book the studio brand, not a freelancer. The slot picker only shows times when the room AND a freelancer for every requested role are free. Freelancers stay the studio's private asset.

## Operating Context

- Payments online through Midtrans Snap (QRIS, e-wallet, VA, card). Status updates automatically.
- WhatsApp is the channel for confirmations, reminders, freelancer jobs, and gallery links.
- Bookkeeping is out of scope; admin downloads Excel.

## Capabilities and Constraints

- Admin settings: rooms (count, capacity, price), DP percent, gallery open days, session durations, team prices, WA templates.
- Gallery: watermarked previews, favorites for retouch, full-size ZIP unlocks after full payment.
- Undecided: client brand name (placeholder "Mawar"), pricing of the system itself, real photography.

## Brand Commitments

- Document name: "PhotoStudio System Proposal" (Evan, 17 Nov 2026).
- Client brand is a placeholder, "Mawar Studio". No logo or palette exists yet.
- UI copy is in Indonesian.

## Evidence on Hand

No real studio photos, prices, or customers. Stock photos are Unsplash License images; all names, bookings, and prices in mockups are synthetic and labeled as examples.

## Product Principles

1. The customer sees one brand and one simple path.
2. Never show a time that cannot actually be served.
3. Admin should not need to check bank transfers or chat to know status.
4. Every number the business may change is a setting, not code.
