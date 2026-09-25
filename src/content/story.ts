export interface StoryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Scene {
  id: string;
  chapter: string;
  title: string;
  emphasis?: string;
  paragraphs: string[];
  image: StoryImage;
  note?: string;
}

// Los nombres vacíos se omiten. Todos los textos se renderizan como texto seguro.
export const personal = {
  recipient: 'Por eso tío Coco',
  baby: 'Vicente',
  signature: 'Con todo nuestro amor. — Judith y Gabriel',
};

export const story = {
  title: 'Tío Coco',
  description: 'Hay historias que empiezan con algo pequeño. Esta es una de ellas.',
  dedication: 'Hay un lugar muy especial en esta historia. Y es tuyo.',
  scenes: [
    {
      id: 'inicio', chapter: 'Queremos contarte algo muy especial',
      title: 'Tío', emphasis: 'Coco.',
      paragraphs: ['Hay noticias que merecen', 'contarse despacito.'],
      image: { src: '/images/letter.svg', alt: 'Un sobre abierto guarda una pequeña estrella.', width: 600, height: 480 },
      note: 'Tomate un momento. Esto es para vos.',
    },
    {
      id: 'comienzo', chapter: '01 — El comienzo',
      title: 'Algo pequeño está por', emphasis: 'cambiarlo todo.',
      paragraphs: ['Una nueva vida. Mil primeras veces.', 'Y una historia que recién empieza.'],
      image: { src: '/images/booties.svg', alt: 'Un par de pequeños escarpines tejidos, unidos por sus cintas.', width: 600, height: 560 },
      note: 'Los comienzos más grandes suelen ser pequeños.',
    },
    {
      id: 'camino', chapter: '02 — El camino',
      title: 'Nadie', emphasis: 'crece solo.',
      paragraphs: ['Cada paso se vuelve más lindo cuando hay alguien cerca para compartirlo.', 'Alguien para las aventuras. Para las preguntas. Para estar.'],
      image: { src: '/images/path.svg', alt: 'Dos recorridos de huellas se encuentran en un mismo camino.', width: 600, height: 560 },
      note: 'Lo más lindo del camino es con quién lo compartís.',
    },
    {
      id: 'vos', chapter: '03 — Una persona especial',
      title: 'Y cuando imaginamos', emphasis: 'quién podría estar ahí…',
      paragraphs: ['Pensamos en vos.', 'En tu cariño, tus historias y todo lo que tenés para dar.'],
      image: { src: '/images/stars.svg', alt: 'Una estrella grande y una pequeña brillan una junto a la otra.', width: 600, height: 480 },
      note: 'Hay personas que hacen la vida un poquito más bonita.',
    },
    {
      id: 'un-nuevo-capitulo', chapter: '04 — Nuestro próximo capítulo',
      title: '¿Querés ser mi ',
      emphasis: 'padrino?',
      paragraphs: ['Queremos que seas parte de esta aventura', 'y de la vida de nuestro bebé.'],
      image: { src: '/images/heart.svg', alt: '', width: 240, height: 180 },
    },
  ] satisfies Scene[],
};
