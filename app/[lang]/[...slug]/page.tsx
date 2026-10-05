import { notFound } from 'next/navigation';

// Any unknown path under a language renders the localised 404 with a real 404 status.
export default function CatchAll() {
  notFound();
}
