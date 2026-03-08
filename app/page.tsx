import Link from 'next/link';

export default function Home() {
  return (
    <section className="card">
      <h1>General Projects</h1>
      <p>anDThe v1 foundation has been added as a modular app experience.</p>
      <Link className="btn primary" href="/andthe">Open anDThe</Link>
    </section>
  );
}
