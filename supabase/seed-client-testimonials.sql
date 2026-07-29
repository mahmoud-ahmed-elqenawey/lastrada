-- Optional seed for the six default testimonials currently used by the website.

insert into public.client_testimonials (
  status,
  accent,
  author_ar,
  author_en,
  role_ar,
  role_en,
  company_ar,
  company_en,
  content_ar,
  content_en,
  video_src,
  poster_src,
  duration,
  sort_order
)
select *
from (values
  (
    'published',
    'purple',
    'Oliga Rose',
    'Oliga Rose',
    'هوية بصرية وتغليف',
    'Brand Identity & Packaging',
    'أولجا روز',
    'Oliga Rose',
    'لاسترادا فهمت طبيعة البراند من أول جلسة، وحولت الهوية والتغليف لشكل واضح، مرتب، ومناسب لطبيعة المنتج والجمهور.',
    'LA STRADA understood the brand from the first session and turned the identity and packaging into a clear, polished system that fits the product and audience.',
    '/media/testimonials/oliga-rose.mp4',
    '/media/testimonials/oliga-rose-poster.jpg',
    '0:42',
    0
  ),
  (
    'published',
    'cyan',
    'Al Ghanem Housing',
    'Al Ghanem Housing',
    'إنتاج مرئي',
    'Video Production',
    'الغانم للإسكان',
    'Al Ghanem Housing',
    'الفيديو خرج بصورة سينمائية منظمة. الفريق كان واضح في التخطيط والتصوير والمونتاج، والنتيجة قدمت المشروع بثقة أكبر.',
    'The video came out cinematic and organized. The team was clear across planning, filming, and editing, and the final result presented the project with stronger confidence.',
    '/media/testimonials/al-ghanem.mp4',
    '/media/testimonials/al-ghanem-poster.jpg',
    '0:38',
    1
  ),
  (
    'published',
    'green',
    'Al Moafah Medical Center',
    'Al Moafah Medical Center',
    'إدارة محتوى وسوشيال ميديا',
    'Content & Social Media',
    'مركز المعافاة الطبي',
    'Al Moafah Medical Center',
    'المحتوى الطبي بقى أوضح وأسهل للناس. لاسترادا قدرت توازن بين المعلومة الطبية والتصميم الجذاب بشكل احترافي.',
    'The medical content became clearer and easier for people to understand. LA STRADA balanced healthcare information and attractive design professionally.',
    '/media/testimonials/elmo3afah.mp4',
    '/media/testimonials/elmo3afah-poster.jpg',
    '0:45',
    2
  ),
  (
    'published',
    'yellow',
    'Abu Al-Rab Dental Clinic',
    'Abu Al-Rab Dental Clinic',
    'سوشيال ميديا ومحتوى طبي',
    'Social Media & Medical Content',
    'عيادة أبو الرُب',
    'Abu Al-Rab Dental Clinic',
    'طريقة عرض المحتوى على السوشيال بقت أوضح وأكثر ثباتا. الفريق اهتم بالتفاصيل وحافظ على شكل احترافي للحسابات.',
    'The social content became clearer and more consistent. The team cared about details and kept the accounts looking professional.',
    '/media/testimonials/abu-al-rab.mp4',
    '/media/testimonials/abu-al-rab-poster.jpg',
    '0:36',
    3
  ),
  (
    'published',
    'red',
    'Mega Café',
    'Mega Café',
    'تصوير منتجات',
    'Product Photography',
    'ميجا كافيه',
    'Mega Café',
    'جلسة التصوير ساعدتنا نعرض المنتجات بشكل أشهى وأنظف. الصور بقت مناسبة للإعلانات والسوشيال بدون الحاجة لتعديلات كثيرة.',
    'The photoshoot helped us present products in a cleaner and more appetizing way. The assets became ready for ads and social media with minimal extra work.',
    '/media/testimonials/mega-cafe.mp4',
    '/media/testimonials/mega-cafe-poster.jpg',
    '0:34',
    4
  ),
  (
    'published',
    'blue',
    'Content Production Client',
    'Content Production Client',
    'إنتاج محتوى وحملات',
    'Content Production & Campaigns',
    'عميل إنتاج محتوى',
    'Content Production Client',
    'التعامل كان منظم من أول التخطيط لحد التسليم. لاسترادا قدرت تحول الأفكار لمحتوى واضح وسهل استخدامه في الحملات.',
    'The workflow was organized from planning to delivery. LA STRADA turned ideas into clear content that we could use directly in campaigns.',
    '/media/testimonials/content-production-client.mp4',
    '/media/testimonials/content-production-client-poster.jpg',
    '0:40',
    5
  )
) as seed(
  status,
  accent,
  author_ar,
  author_en,
  role_ar,
  role_en,
  company_ar,
  company_en,
  content_ar,
  content_en,
  video_src,
  poster_src,
  duration,
  sort_order
)
where not exists (
  select 1
  from public.client_testimonials existing
  where existing.author_en = seed.author_en
);
