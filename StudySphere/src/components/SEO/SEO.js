import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description = 'StudySphere - Your Ultimate Study Companion for Academic Success',
  keywords = 'study, education, learning, student, academic, productivity, study companion, flashcards, study dungeon, quests, achievements',
  ogImage = '/og-image.jpg',
  ogType = 'website',
}) => {
  const siteTitle = 'StudySphere';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@studysphere" />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="canonical" href={window.location.href} />
      <meta name="theme-color" content="#1976d2" />
      <meta name="application-name" content={siteTitle} />
      <meta name="apple-mobile-web-app-title" content={siteTitle} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    </Helmet>
  );
};

export default SEO; 