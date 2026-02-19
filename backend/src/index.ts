import type { Core } from '@strapi/strapi';
import { seedDemoData } from './seed';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.log.info('────────────────────────────────────────────────────────────────────');
    strapi.log.info('REMINDER: Enable public permissions for Edition, Article, Galerie, Page, GlobalSetting');
    strapi.log.info('         Admin Panel > Settings > Users & Permissions > Roles > Public');
    strapi.log.info('────────────────────────────────────────────────────────────────────');

    // Seed demo data if SEED=true
    await seedDemoData(strapi);
  },
};
