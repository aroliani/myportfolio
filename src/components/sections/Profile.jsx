import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Sparkles } from 'lucide-react';
import profileImage from '../../assets/foto.png';
import CvActions from '../cv/CvActions.jsx';

const educationData = [
  {
    icon: GraduationCap,
    label: 'Formal',
    title: 'President University — North Cikarang',
    detail: 'Undergraduate Student in Computing Informatics · GPA 3.75/4.00',
    period: 'Sep 2023 – Present',
  },
  {
    icon: Sparkles,
    label: 'Non-formal',
    title: 'Korea–ASEAN Digital Academy (KADA) Bootcamp',
    detail: 'Web Development, Cloud, DevOps, UI/UX Design & Data Analysis',
    period: 'Jun 2025 – Present',
  },
];

const Profile = () => (
  <motion.section
    id="profile"
    className="relative py-20 md:py-24"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7 }}
  >
    <div className="container mx-auto px-6">
      <div className="mb-12 text-center">
        <p className="section-eyebrow mb-3">The archer behind the bow</p>
        <h2 className="display-heading text-3xl md:text-4xl">About Me</h2>
        <div className="rune-divider mx-auto mt-5 max-w-xs" />
        <p className="mx-auto mt-5 max-w-2xl text-base text-mist/70">
          Get to know who I am and what drives my passion in tech.
        </p>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-10 md:flex-row md:gap-12 lg:gap-16">
        <div className="w-full flex-shrink-0 md:w-[42%]">
          <div className="ornate relative mx-auto w-fit rounded-[28px] border border-loch-300/20 bg-night-900/50 p-3">
            <div className="pointer-events-none absolute -inset-2 rounded-[32px] bg-[radial-gradient(circle_at_30%_20%,rgba(43,184,148,0.22),transparent_60%)] blur-xl" />
            <img
              src={profileImage}
              alt="Aroliani Munte"
              className="relative mx-auto aspect-square h-72 w-72 rounded-[22px] border border-loch-300/20 object-cover shadow-2xl shadow-black/50 sm:h-80 sm:w-80 md:h-[min(36vw,28rem)] md:w-[min(36vw,28rem)]"
            />
          </div>
        </div>

        <div className="w-full text-center md:w-[58%] md:text-left">
          <div className="mb-5">
            <p className="section-eyebrow">A little about me</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-mist sm:text-3xl">
              Hi, I’m Aroo, short for Aroliani.
            </h3>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-mist/80 sm:text-lg">
            <p>
              I’m an Informatics graduate awaiting graduation from President University, with hands-on experience in
              web development, database management, IT operations, documentation, and cybersecurity fundamentals.
            </p>
            <p>
              During my internship at Asuransi Ciputra Indonesia (Ciputra Life), I supported daily IT operations,
              secure document archiving, and contributed to a Cyber Threat Intelligence report using Wazuh and
              CrowdStrike.
            </p>
            <p>
              I’ve also built academic and capstone projects — including the SAKURA document management system — and
              I’m always ready to learn and adapt to new technologies and working environments.
            </p>
          </div>

          <div className="mt-8">
            <CvActions />
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {educationData.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.title}
              className="glass ornate rounded-2xl p-6"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ember-300/30 bg-ember-500/10 text-ember-300">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-loch-300">{item.label}</p>
                  <h4 className="mt-1 font-display text-lg text-mist">{item.title}</h4>
                  <p className="mt-1 text-sm text-mist/70">{item.detail}</p>
                  <p className="mt-2 font-mono text-xs text-ember-300/80">{item.period}</p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  </motion.section>
);

export default Profile;
