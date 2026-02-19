/**
 * Seed script for demo data.
 * Creates 1 Edition, 3 Articles, and 1 Galerie with realistic data.
 * Run with: SEED=true npm run develop
 * Only seeds if the database is empty (no existing editions).
 */
export async function seedDemoData(strapi: any) {
  if (process.env.SEED !== 'true') return;

  // Check if data already exists
  const existingEditions = await strapi.documents('api::edition.edition').findMany({ limit: 1 });
  if (existingEditions.length > 0) {
    strapi.log.info('🌱 Seed: Data already exists, skipping.');
    return;
  }

  strapi.log.info('🌱 Seed: Creating demo data...');

  // 1. Create Edition
  const edition = await strapi.documents('api::edition.edition').create({
    data: {
      annee: '2025',
      date_action: '2025-04-26',
      montant_collecte: 12450.00,
      description: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: "L'édition 2025 de Une Rose Un Espoir a rassemblé plus de 200 motards bénévoles à travers tout le département. Pendant tout un week-end, nos équipes ont sillonné les routes pour distribuer des roses et collecter des dons en faveur de la ",
            },
            {
              type: 'text',
              text: 'Ligue contre le cancer',
              bold: true,
            },
            {
              type: 'text',
              text: '.',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: "Grâce à la générosité de tous, nous avons pu collecter ",
            },
            {
              type: 'text',
              text: '12 450 €',
              bold: true,
            },
            {
              type: 'text',
              text: " qui seront intégralement reversés à la recherche et à l'accompagnement des malades.",
            },
          ],
        },
      ],
      partenaires: [
        { nom: 'Ligue contre le cancer', url: 'https://www.ligue-cancer.net/' },
        { nom: 'Mairie de Beauvais', url: 'https://www.beauvais.fr/' },
        { nom: 'Moto Club de l\'Oise', url: null },
      ],
    },
    status: 'published',
  });

  strapi.log.info(`🌱 Seed: Edition ${edition.annee} created.`);

  // 2. Create Articles with rich Blocks content
  const articlesData = [
    {
      titre: 'Retour sur l\'édition 2025 : un succès record !',
      slug: 'retour-edition-2025',
      date: '2025-05-02',
      categorie: 'Actualité',
      contenu: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: "L'édition 2025 de " },
            { type: 'text', text: 'Une Rose Un Espoir', bold: true },
            { type: 'text', text: " restera dans les annales ! Avec plus de " },
            { type: 'text', text: '200 motards mobilisés', bold: true },
            { type: 'text', text: " et " },
            { type: 'text', text: '12 450 € collectés', bold: true, italic: true },
            { type: 'text', text: ", nous avons battu notre record de l'année précédente." },
          ],
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: "Un immense merci à tous les bénévoles, partenaires et donateurs qui ont rendu cette journée possible. Consultez le site de la " },
            {
              type: 'link',
              url: 'https://www.ligue-cancer.net/',
              children: [{ type: 'text', text: 'Ligue contre le cancer' }],
            },
            { type: 'text', text: " pour en savoir plus sur l'utilisation des fonds." },
          ],
        },
        {
          type: 'heading',
          level: 2,
          children: [{ type: 'text', text: 'Les moments forts' }],
        },
        {
          type: 'list',
          format: 'unordered',
          children: [
            { type: 'list-item', children: [{ type: 'text', text: 'Départ groupé depuis la place de l\'Hôtel de Ville avec 150 motos' }] },
            { type: 'list-item', children: [{ type: 'text', text: 'Traversée des villages du département' }] },
            { type: 'list-item', children: [{ type: 'text', text: 'Remise officielle du chèque à la délégation départementale' }] },
          ],
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: "Le départ groupé depuis la place de l'Hôtel de Ville a été un moment d'émotion intense. Le cortège a ensuite traversé les villages, accueilli " },
            { type: 'text', text: 'chaleureusement', italic: true },
            { type: 'text', text: ' par les habitants.' },
          ],
        },
      ],
      edition: edition.documentId,
    },
    {
      titre: 'Prochaine édition : save the date !',
      slug: 'prochaine-edition-save-the-date',
      date: '2025-03-15',
      categorie: 'Événement',
      contenu: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'Marquez vos calendriers ! ', bold: true },
            { type: 'text', text: "La prochaine édition de Une Rose Un Espoir aura lieu le " },
            { type: 'text', text: '26 avril 2025', bold: true, underline: true },
            { type: 'text', text: ". Que vous soyez motard ou simple sympathisant, rejoignez-nous !" },
          ],
        },
        {
          type: 'heading',
          level: 3,
          children: [{ type: 'text', text: 'Comment participer ?' }],
        },
        {
          type: 'list',
          format: 'ordered',
          children: [
            { type: 'list-item', children: [{ type: 'text', text: 'Inscrivez-vous via notre formulaire de contact' }] },
            { type: 'list-item', children: [{ type: 'text', text: 'Rejoignez votre point de départ le jour J' }] },
            { type: 'list-item', children: [{ type: 'text', text: 'Distribuez des roses et collectez des dons !' }] },
          ],
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: "Pour vous inscrire, rendez-vous sur notre " },
            {
              type: 'link',
              url: '/contact',
              children: [{ type: 'text', text: 'page de contact' }],
            },
            { type: 'text', text: "." },
          ],
        },
      ],
      edition: edition.documentId,
    },
    {
      titre: 'Interview : le témoignage de Marie, bénévole depuis 10 ans',
      slug: 'temoignage-marie-benevole',
      date: '2025-02-20',
      categorie: 'Presse',
      contenu: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: "Marie participe à Une Rose Un Espoir depuis la toute première édition. À ", },
            { type: 'text', text: '62 ans', bold: true },
            { type: 'text', text: ", cette passionnée de moto n'a jamais manqué un seul rendez-vous." },
          ],
        },
        {
          type: 'quote',
          children: [
            { type: 'text', text: "Ce qui me touche le plus, c'est le sourire des gens quand on leur offre une rose. On sent que notre action a du sens.", italic: true },
          ],
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: '— Marie, ', bold: true },
            { type: 'text', text: 'bénévole depuis 2015', italic: true },
          ],
        },
        {
          type: 'heading',
          level: 2,
          children: [{ type: 'text', text: 'Un engagement qui inspire' }],
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: "Son engagement sans faille inspire chaque année de nouveaux bénévoles à rejoindre l'aventure. " },
            { type: 'text', text: "Si vous aussi souhaitez participer, n'hésitez pas à nous contacter !", underline: true },
          ],
        },
      ],
      edition: edition.documentId,
    },
  ];

  for (const articleData of articlesData) {
    const { edition: editionId, ...rest } = articleData;
    const article = await strapi.documents('api::article.article').create({
      data: rest,
      status: 'published',
    });
    // Link to edition
    if (editionId) {
      await strapi.documents('api::article.article').update({
        documentId: article.documentId,
        data: { edition: editionId },
        status: 'published',
      });
    }
    strapi.log.info(`🌱 Seed: Article "${article.titre}" created.`);
  }

  // 3. Create Galerie (without medias — those need manual upload)
  const galerie = await strapi.documents('api::galerie.galerie').create({
    data: {
      titre: 'Édition 2025 - Photos du week-end',
      youtube_urls: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
    },
    status: 'published',
  });

  // Link galerie to edition
  await strapi.documents('api::galerie.galerie').update({
    documentId: galerie.documentId,
    data: { edition: edition.documentId },
    status: 'published',
  });

  strapi.log.info(`🌱 Seed: Galerie "${galerie.titre}" created.`);
  strapi.log.info('🌱 Seed: Done! Demo data created successfully.');
  strapi.log.info('🌱 Seed: Upload images manually via the admin panel for full demo effect.');
}
