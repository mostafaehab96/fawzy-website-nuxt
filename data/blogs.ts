/**
 * Blog Articles Data (`data/blogs.ts`)
 * ------------------------------------
 * Shared between:
 *   - `components/home/HomeBlogSection.vue` (shows items with `featuredOnHome: true`)
 *   - `pages/blog/index.vue` (shows all items)
 *
 * HOW TO PUBLISH AN ARTICLE LATER:
 *   Add a `url` (external link or internal route like `/blog/my-slug`) to any item.
 *   When `url` is omitted, clicking "عرض المقال" displays the "Coming Soon" modal.
 */

export interface BlogPostItem {
  id: string
  title: string
  excerpt: string
  image: string
  imageAlt: string
  /** Show this post on the Home page blog preview section */
  featuredOnHome?: boolean
  /** Optional link when the article is ready; if omitted, shows "سيكون المقال متوفر قريبًا" */
  url?: string
}

export const blogPosts: BlogPostItem[] = [
  {
    id: 'start-video-editing-from-scratch',
    title: 'كيف تبدأ في مجال تحرير الفيديوهات من الصفر؟',
    excerpt:
      'في عالمنا اليوم، أصبح الفيديو هو اللغة السائدة. من مقاطع اليوتيوب التعليمية إلى فيديوهات تيك توك الترفيهية، ومن الإعلانات التجارية الجذابة إلى المحتوى التسويقي الرقمي، يلعب الفيديو دوراً محورياً في حياتنا اليومية وعلى جميع المنصات. ومع هذا الانتشار الهائل، تزايد الطلب بشكل كبير على مهارة تحرير الفيديو...',
    image:
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Color Grading',
    featuredOnHome: true,
  },
  {
    id: 'what-is-montage-guide',
    title: 'ما هو المونتاج؟ دليل شامل للمبتدئين',
    excerpt:
      'في عالمنا الرقمي المتسارع، أصبح الفيديو هو الوسيلة الأكثر تأثيراً في التواصل ونقل الأفكار، سواء كان ذلك عبر منصات التواصل الاجتماعي، القنوات التلفزيونية، أو حتى في العروض التقديمية الشخصية. ولكن خلف كل فيديو جذاب ومؤثر، تكمن عملية فنية وتقنية معقدة تُعرف بـ "المونتاج" أو "تحرير الفيديو". للكثيرين، قد يبدو المونتاج مجرد قص ولصق لمقاطع الفيديو، لكنه في الحقيقة فن بحد ذاته، يمنح الحياة للقصص ويصقل الرسائل البصرية لتصل إلى الجمهور بأقصى فعالية...',
    image:
      'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Editing Setup',
    featuredOnHome: true,
  },
  {
    id: 'top-5-editing-terms',
    title: 'أهم 5 مصطلحات يجب أن يعرفها كل مونتير مبتدئ',
    excerpt:
      'عندما تبدأ رحلتك في عالم تحرير الفيديو، قد تشعر وكأنك تدخل عالماً جديداً تماماً، مليئاً بالمصطلحات والمفاهيم التي تبدو غريبة في البداية. من "التايم لاين" إلى "الكولور جريدنج"، ومن "اللقطة" إلى "التسلسل"، قد تبدو هذه الكلمات وكأنها لغة سرية لا يفهمها إلا المحترفون. ولكن لا تقلق، فكل خبير بدأ من الصفر، وكل مصطلح معقد له معنى بسيط يمكن فهمه...',
    image:
      'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Storytelling',
  },
  {
    id: 'best-free-editing-software',
    title: 'مقارنة شاملة: أفضل برامج المونتاج المجانية للمبتدئين',
    excerpt:
      'عندما تبدأ رحلتك في عالم تحرير الفيديو، قد يكون التحدي الأول الذي يواجهك هو اختيار برنامج المونتاج المناسب. فمع وجود العديد من الخيارات المتاحة، سواء كانت مدفوعة أو مجانية، قد تشعر بالحيرة. ولكن الخبر السار هو أنك لست بحاجة إلى إنفاق مبالغ طائلة على برامج احترافية باهظة الثمن لتبدأ في إنتاج فيديوهات رائعة. في الواقع، هناك العديد من برامج المونتاج المجانية التي توفر أدوات قوية وميزات كافية للمبتدئين، بل وحتى للمستخدمين الأكثر تقدماً...',
    image:
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Motion Graphics',
  },
  {
    id: 'choose-first-video-camera',
    title: 'كيف تختار أول كاميرا لتصوير الفيديوهات؟',
    excerpt:
      'في رحلتك نحو عالم صناعة الفيديو، سواء كنت تطمح لتصبح يوتيوبر، صانع أفلام وثائقية، أو مجرد شخص يرغب في توثيق لحظاته الخاصة بجودة عالية، فإن اختيار الكاميرا المناسبة هو خطوة أساسية ومحورية. قد تبدو هذه المهمة شاقة في البداية، فالسوق مليء بالخيارات المتنوعة، من كاميرات الهواتف الذكية إلى الكاميرات الاحترافية ذات العدسات القابلة للتغيير، وكل منها يأتي بمواصفات وميزات مختلفة وأسعار متباينة...',
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Cinematic',
  },
  {
    id: 'editing-vs-montage-vs-directing',
    title: 'الفرق بين تحرير الفيديو والمونتاج والإخراج',
    excerpt:
      'في عالم صناعة الفيديو، غالباً ما تُستخدم مصطلحات مثل "تحرير الفيديو"، "المونتاج"، و"الإخراج" بالتبادل، مما قد يسبب التباساً، خاصة للمبتدئين. فهل هي كلها تعني الشيء نفسه؟ أم أن هناك فروقاً دقيقة تميز كل منها؟ الإجابة هي أن هذه المصطلحات، على الرغم من ترابطها الوثيق في عملية إنتاج الفيديو، إلا أنها تشير إلى أدوار ومسؤوليات مختلفة تماماً، وكل منها يمثل حلقة أساسية في سلسلة الإبداع المرئي...',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Sound Design',
  },
]
