import { motion } from 'framer-motion';

/**
 * Hero editorial da home oficial Óticas Paris.
 * Banner full-bleed (ponta a ponta) como no site oficial.
 * A imagem já contém o texto editorial e o CTA "Clique e veja".
 */
export default function HomeHero() {
  return (
    <section className="relative w-full bg-white border-b border-slate-100">
      <motion.a
        href="#"
        aria-label="Coleção Prada — Clique e veja"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="block w-full group"
      >
        <img
          src="https://tfcqdl.vtexassets.com/assets/vtex.file-manager-graphql/images/92cbaf13-27da-43d1-9a9b-09bef35608bf___efdf3a45504f9c3ea58e25f8e261f0db.png"
          alt="Na Paris, todo mundo pode usar Prada"
          className="block w-full h-auto object-cover"
          loading="eager"
        />
      </motion.a>
    </section>
  );
}