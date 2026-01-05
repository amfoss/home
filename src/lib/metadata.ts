import { Metadata } from 'next';
import icon from "@/../public/amfoss-logo-white-square.png";

export const siteMetadata: Metadata = {
  title: 'amFOSS - Home Portal',
  description: 'Official home portal for amFOSS (FOSS@Amrita), a student-run Free and Open Source Software club at Amrita Vishwa Vidyapeetham. Access member profiles, attendance tracking, leaderboards, and club resources.',
  keywords: [
    'amFOSS',
    'FOSS@Amrita',
    'Amrita FOSS',
    'amFOSS club',
    'Amrita Vishwa Vidyapeetham',
    'open source club',
    'FOSS club',
    'student tech community',
    'coding club Amrita',
    'amFOSS members',
    'amFOSS portal',
    'amFOSS home',
    'tech club India',
    'open source community',
    'student developers',
  ],
  authors: [{ name: 'amFOSS', url: 'https://amfoss.in' }],
  creator: 'amFOSS',
  publisher: 'amFOSS',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://home.amfoss.in',
    siteName: 'amFOSS Home',
    title: 'amFOSS - Home Portal',
    description: 'Official home portal for amFOSS club members. Track attendance, view leaderboards, and manage your profile.',
    images: [
      {
        url: icon.src,
        width: 512,
        height: 512,
        alt: 'amFOSS Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'amFOSS - Home Portal',
    description: 'Official home portal for amFOSS club members at Amrita Vishwa Vidyapeetham',
    images: [icon.src],
    creator: '@amfoss_in',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: icon.src,
    shortcut: icon.src,
    apple: icon.src,
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://home.amfoss.in',
  },
};
