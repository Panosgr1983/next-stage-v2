interface ServiceGalleryItem {
  src: string;
  alt: string;
}

export interface ServiceData {
  slug: string;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  headerImage: string;
  gallery: ServiceGalleryItem[];
}

const CLOUDINARY = 'https://res.cloudinary.com/duabzt63b/image/upload/f_auto';

export const servicesData: ServiceData[] = [
  {
    slug: 'laptop-repair',
    titleKey: 'services.laptopRepair.title',
    subtitleKey: 'services.laptopRepair.subtitle',
    descriptionKey: 'services.laptopRepair.description',
    headerImage: `${CLOUDINARY}/v1783620782/laptop-service_pd6spv.png`,
    gallery: [
      { src: `${CLOUDINARY}/v1783620782/laptop-service_pd6spv.png`, alt: 'Επισκευή Laptop' },
      { src: '/images/gallery/DSC_2814.webp', alt: 'Χώρος επισκευής' },
      { src: '/images/gallery/DSC_2938.webp', alt: 'Τεχνικός στη δουλειά' },
    ],
  },
  {
    slug: 'desktop-repair',
    titleKey: 'services.desktopRepair.title',
    subtitleKey: 'services.desktopRepair.subtitle',
    descriptionKey: 'services.desktopRepair.description',
    headerImage: `${CLOUDINARY}/v1783620782/desktop-service_gt2dmf.png`,
    gallery: [
      { src: `${CLOUDINARY}/v1783620782/desktop-service_gt2dmf.png`, alt: 'Επισκευή Desktop' },
      { src: '/images/gallery/DSC_2801.webp', alt: 'Πάγκος εργασίας' },
      { src: '/images/gallery/DSC_2796.webp', alt: 'Εξοπλισμός' },
    ],
  },
  {
    slug: 'imac-repair',
    titleKey: 'services.imacRepair.title',
    subtitleKey: 'services.imacRepair.subtitle',
    descriptionKey: 'services.imacRepair.description',
    headerImage: `${CLOUDINARY}/v1783620783/imac-service_tzu1ec.png`,
    gallery: [
      { src: `${CLOUDINARY}/v1783620783/imac-service_tzu1ec.png`, alt: 'Επισκευή iMac' },
      { src: '/images/gallery/DSC_2785.webp', alt: 'Εργαστήριο' },
    ],
  },
  {
    slug: 'macbook-repair',
    titleKey: 'services.macbookRepair.title',
    subtitleKey: 'services.macbookRepair.subtitle',
    descriptionKey: 'services.macbookRepair.description',
    headerImage: `${CLOUDINARY}/v1783620783/macbook-service_hzltf1.png`,
    gallery: [
      { src: `${CLOUDINARY}/v1783620783/macbook-service_hzltf1.png`, alt: 'Επισκευή MacBook' },
      { src: '/images/gallery/DSC_2929.webp', alt: 'Επισκευή υπολογιστή' },
      { src: '/images/gallery/DSC_2932.webp', alt: 'Διάγνωση προβλήματος' },
    ],
  },
  {
    slug: 'macmini-repair',
    titleKey: 'services.macMiniRepair.title',
    subtitleKey: 'services.macMiniRepair.subtitle',
    descriptionKey: 'services.macMiniRepair.description',
    headerImage: `${CLOUDINARY}/v1783620783/macmini-service_e5yiuv.png`,
    gallery: [
      { src: `${CLOUDINARY}/v1783620783/macmini-service_e5yiuv.png`, alt: 'Επισκευή Mac Mini' },
      { src: '/images/gallery/DSC_2796.webp', alt: 'Εξοπλισμός' },
    ],
  },
  {
    slug: 'data-recovery',
    titleKey: 'services.dataRecovery.title',
    subtitleKey: 'services.dataRecovery.subtitle',
    descriptionKey: 'services.dataRecovery.description',
    headerImage: `${CLOUDINARY}/v1783620783/data-recovery_vl2xv3.png`,
    gallery: [
      { src: `${CLOUDINARY}/v1783620783/data-recovery_vl2xv3.png`, alt: 'Ανάκτηση Δεδομένων' },
      { src: '/images/gallery/DSC_2792.webp', alt: 'Εργαλεία επισκευής' },
    ],
  },
  {
    slug: 'gaming-pc',
    titleKey: 'services.gamingPc.title',
    subtitleKey: 'services.gamingPc.subtitle',
    descriptionKey: 'services.gamingPc.description',
    headerImage: `${CLOUDINARY}/v1783620783/custom-gaming-pc_di2vao.png`,
    gallery: [
      { src: `${CLOUDINARY}/v1783620783/custom-gaming-pc_di2vao.png`, alt: 'Custom Gaming PC' },
      { src: '/images/gallery/DSC_2922.webp', alt: 'Αναβάθμιση' },
      { src: '/images/gallery/DSC_2924.webp', alt: 'Σέρβις' },
    ],
  },
  {
    slug: 'pro-audio',
    titleKey: 'services.proAudio.title',
    subtitleKey: 'services.proAudio.subtitle',
    descriptionKey: 'services.proAudio.description',
    headerImage: `${CLOUDINARY}/v1783620782/professional-audio-service_p7fvo5.png`,
    gallery: [
      { src: `${CLOUDINARY}/v1783620782/professional-audio-service_p7fvo5.png`, alt: 'Επαγγελματικός Ήχος' },
      { src: '/images/gallery/DSC_2926.webp', alt: 'Συντήρηση' },
    ],
  },
  {
    slug: 'tv-console-repair',
    titleKey: 'services.tvRepair.title',
    subtitleKey: 'services.tvRepair.subtitle',
    descriptionKey: 'services.tvRepair.description',
    headerImage: `${CLOUDINARY}/v1783620782/tv-console-service_vlkrhb.png`,
    gallery: [
      { src: `${CLOUDINARY}/v1783620782/tv-console-service_vlkrhb.png`, alt: 'Επισκευή TV & Κονσόλες' },
      { src: '/images/gallery/DSC_2914.webp', alt: 'Εργασία ακριβείας' },
    ],
  },
  {
    slug: 'os-installation',
    titleKey: 'services.osInstallation.title',
    subtitleKey: 'services.osInstallation.subtitle',
    descriptionKey: 'services.osInstallation.description',
    headerImage: `${CLOUDINARY}/v1783620782/os-instalation_rdxxns.png`,
    gallery: [
      { src: `${CLOUDINARY}/v1783620782/os-instalation_rdxxns.png`, alt: 'Εγκατάσταση Λειτουργικού' },
      { src: '/images/gallery/DSC_2932.webp', alt: 'Διάγνωση' },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find(s => s.slug === slug);
}
