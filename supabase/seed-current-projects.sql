-- Generated from messages/projects by scripts/seed-portfolio-from-json.mjs
-- Run in Supabase SQL Editor after supabase/schema.sql.

begin;
alter table public.project_translations add column if not exists type text;

-- abu-al-rab-social
with upsert_project as (
  insert into public.projects (slug, status, category, accent, type, sort_order)
  values ('abu-al-rab-social', 'published', 'social_media_management', 'yellow', 'Social Media', 0)
  on conflict (slug) do update set
    status = excluded.status,
    category = excluded.category,
    accent = excluded.accent,
    type = excluded.type,
    sort_order = excluded.sort_order
  returning id
)
delete from public.project_media where project_id = (select id from upsert_project);

with upsert_project as (select id from public.projects where slug = 'abu-al-rab-social')
delete from public.project_deliverables where project_id = (select id from upsert_project);

with upsert_project as (select id from public.projects where slug = 'abu-al-rab-social')
delete from public.project_translations where project_id = (select id from upsert_project);

with upsert_project as (select id from public.projects where slug = 'abu-al-rab-social')
insert into public.project_translations (
  project_id, locale, title, client, type, description, summary, overview_title, challenge_title,
  challenge, solution_title, solution, success_title, success_story, deliverables_title,
  gallery_title, video_title, cta_title, cta_body, cta_label
)
values
((select id from upsert_project), 'en', 'Social Media | Abu Al-Rab Dental Clinic', 'Abu Al-Rab Dental Clinic', 'Social Media', 'LA STRADA manages the social media presence of Abu Al-Rab Dental Clinics through a complete visual and content system. The work includes professional campaign posts, medical messaging, short-form video content, and consistent assets that support the clinic''s credibility, visibility, and patient communication across digital platforms.', 'A full social media presence for Abu Al-Rab Dental Clinics, combining branded medical posts, short-form video, and consistent campaign visuals.', 'A medical social presence with clear visual discipline', 'Challenge', 'Abu Al-Rab Dental Clinics needed a social media presence that could communicate medical trust, daily engagement, and campaign clarity without losing brand consistency.', 'Solution', 'LA STRADA shaped a content system for the clinic across branded posts, educational messaging, short-form video, and paid-campaign-ready visuals.', null, null, 'Deliverables', 'Social media gallery', 'Video assets', 'Need a stronger medical presence on social media?', 'LA STRADA can build a visual content system that keeps your clinic clear, trusted, and active across platforms.', 'Start a social media project'),
((select id from upsert_project), 'ar', 'منصات التواصل الاجتماعي | عيادة أبو الرُب لطب الأسنان', 'عيادة أبو الرُب', 'التواصل الاجتماعي', 'تتولى لاسترادا إدارة الحضور الرقمي لعيادات أبو الرب لطب الأسنان من خلال نظام بصري ومحتوى متكامل. يشمل العمل تصميم منشورات الحملات الطبية، صياغة رسائل واضحة، إنتاج فيديو قصير، وتجهيز أصول نشر متسقة تدعم ثقة العيادة وظهورها وتواصلها مع المرضى عبر المنصات الرقمية.', 'حضور سوشيال ميديا متكامل لعيادات أبو الرب، يجمع بين منشورات طبية بهوية واضحة وفيديو قصير واتساق بصري للحملات.', 'حضور طبي اجتماعي بانضباط بصري واضح', 'التحدي', 'احتاجت عيادات أبو الرب إلى حضور على السوشيال ميديا يوازن بين الثقة الطبية والتفاعل اليومي ووضوح الحملات، مع الحفاظ على اتساق الهوية.', 'الحل', 'بنت لاسترادا نظام محتوى للعيادة يشمل المنشورات الطبية، الرسائل التوعوية، الفيديوهات القصيرة، وتصميمات جاهزة لدعم الحملات الممولة.', null, null, 'المخرجات', 'معرض السوشيال ميديا', 'محتوى الفيديو', 'محتاج حضور طبي أقوى على السوشيال ميديا؟', 'تقدر لاسترادا تبني منظومة محتوى بصرية تجعل عيادتك واضحة وموثوقة ونشطة على المنصات.', 'ابدأ مشروع سوشيال ميديا');

with upsert_project as (select id from public.projects where slug = 'abu-al-rab-social')
insert into public.project_deliverables (project_id, locale, label, sort_order)
values
((select id from upsert_project), 'en', 'Social media post design', 0),
((select id from upsert_project), 'en', 'Medical campaign visuals', 1),
((select id from upsert_project), 'en', 'Short-form video', 2),
((select id from upsert_project), 'en', 'Content direction', 3),
((select id from upsert_project), 'en', 'Brand-consistent publishing assets', 4),
((select id from upsert_project), 'ar', 'تصميم منشورات السوشيال ميديا', 0),
((select id from upsert_project), 'ar', 'تصميم حملات طبية', 1),
((select id from upsert_project), 'ar', 'فيديو قصير', 2),
((select id from upsert_project), 'ar', 'إخراج المحتوى', 3),
((select id from upsert_project), 'ar', 'أصول نشر متسقة مع الهوية', 4);


with upsert_project as (select id from public.projects where slug = 'abu-al-rab-social')
insert into public.project_media (project_id, type, src, poster, alt_ar, alt_en, label_ar, label_en, is_cover, sort_order)
values
((select id from upsert_project), 'image', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Social%20Media%20%7C%20Abu%20Al-Rube/images/Abu-alrub%20(1).jpg', null, 'تصميم سوشيال ميديا أبو الرب 1 من لاسترادا', 'Abu Al-Rab social media artwork 1 by LA STRADA', 'منشور حملة', 'Campaign Post', true, 0),
((select id from upsert_project), 'image', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Social%20Media%20%7C%20Abu%20Al-Rube/images/Abu-alrub%20(2).jpg', null, 'تصميم سوشيال ميديا أبو الرب 2 من لاسترادا', 'Abu Al-Rab social media artwork 2 by LA STRADA', 'منشور حملة', 'Campaign Post', false, 1),
((select id from upsert_project), 'image', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Social%20Media%20%7C%20Abu%20Al-Rube/images/Abu-alrub%20(3).jpg', null, 'تصميم سوشيال ميديا أبو الرب 3 من لاسترادا', 'Abu Al-Rab social media artwork 3 by LA STRADA', 'منشور طبي', 'Medical Post', false, 2),
((select id from upsert_project), 'image', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Social%20Media%20%7C%20Abu%20Al-Rube/images/Abu-alrub%20(4).jpg', null, 'تصميم سوشيال ميديا أبو الرب 4 من لاسترادا', 'Abu Al-Rab social media artwork 4 by LA STRADA', 'منشور طبي', 'Medical Post', false, 3),
((select id from upsert_project), 'image', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Social%20Media%20%7C%20Abu%20Al-Rube/images/Abu-alrub%20(5).jpg', null, 'تصميم سوشيال ميديا أبو الرب 5 من لاسترادا', 'Abu Al-Rab social media artwork 5 by LA STRADA', 'منشور سوشيال', 'Social Post', false, 4),
((select id from upsert_project), 'image', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Social%20Media%20%7C%20Abu%20Al-Rube/images/Abu-alrub%20(6).jpg', null, 'تصميم سوشيال ميديا أبو الرب 6 من لاسترادا', 'Abu Al-Rab social media artwork 6 by LA STRADA', 'منشور سوشيال', 'Social Post', false, 5),
((select id from upsert_project), 'image', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Social%20Media%20%7C%20Abu%20Al-Rube/images/Abu-alrub%20(7).jpg', null, 'تصميم سوشيال ميديا أبو الرب 7 من لاسترادا', 'Abu Al-Rab social media artwork 7 by LA STRADA', 'تصميم حملة', 'Campaign Design', false, 6),
((select id from upsert_project), 'image', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Social%20Media%20%7C%20Abu%20Al-Rube/images/Abu-alrub%20(8).jpg', null, 'تصميم سوشيال ميديا أبو الرب 8 من لاسترادا', 'Abu Al-Rab social media artwork 8 by LA STRADA', 'تصميم حملة', 'Campaign Design', false, 7),
((select id from upsert_project), 'video', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Social%20Media%20%7C%20Abu%20Al-Rube/videos/brand%20video.mp4', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Social%20Media%20%7C%20Abu%20Al-Rube/videos/Cover%20brand%20video.jpg', 'فيديو علامة أبو الرب من لاسترادا', 'Abu Al-Rab brand video by LA STRADA', 'فيديو العلامة', 'Brand Video', false, 8);


-- al-ghanem-housing
with upsert_project as (
  insert into public.projects (slug, status, category, accent, type, sort_order)
  values ('al-ghanem-housing', 'published', 'content_production', 'cyan', 'Video Production', 1)
  on conflict (slug) do update set
    status = excluded.status,
    category = excluded.category,
    accent = excluded.accent,
    type = excluded.type,
    sort_order = excluded.sort_order
  returning id
)
delete from public.project_media where project_id = (select id from upsert_project);

with upsert_project as (select id from public.projects where slug = 'al-ghanem-housing')
delete from public.project_deliverables where project_id = (select id from upsert_project);

with upsert_project as (select id from public.projects where slug = 'al-ghanem-housing')
delete from public.project_translations where project_id = (select id from upsert_project);

with upsert_project as (select id from public.projects where slug = 'al-ghanem-housing')
insert into public.project_translations (
  project_id, locale, title, client, type, description, summary, overview_title, challenge_title,
  challenge, solution_title, solution, success_title, success_story, deliverables_title,
  gallery_title, video_title, cta_title, cta_body, cta_label
)
values
((select id from upsert_project), 'en', 'Video Production | Al Ghanem Housing', 'Al Ghanem Housing', 'Video Production', 'Al Ghanem Housing video project was produced as a complete end-to-end production, starting from script writing and concept development, through full execution, filming direction, and professional editing. The aim was to translate the brand''s message into a clear and engaging visual story that reflects its identity and values in a modern and impactful way.', 'A cinematic real-estate video production shaped from script and direction through filming and final edit.', 'A complete real-estate film', 'Challenge', 'Al Ghanem Housing needed a video that could present the project with clarity, atmosphere, and a polished visual rhythm instead of a simple informational edit.', 'Solution', 'LA STRADA handled the video as a complete production pipeline, shaping the script, directing the shoot, and editing the final story into a cinematic brand piece.', null, null, 'Deliverables', 'Project film', 'Video assets', 'Need a real-estate story with stronger visual impact?', 'LA STRADA can shape the concept, shoot, and final edit into a clear cinematic project film.', 'Start a video project'),
((select id from upsert_project), 'ar', 'إنتاج الفيديو | الغانم للإسكان', 'الغانم للإسكان', 'الإنتاج المرئي', 'تم إنتاج مشروع الفيديو الخاص بشركة الغانم للإسكان كعملية متكاملة من البداية إلى النهاية، بدءًا من كتابة السيناريو وتطوير الفكرة، مرورًا بالتنفيذ الكامل، وإخراج التصوير، وصولًا إلى المونتاج الاحترافي. وكان الهدف هو ترجمة رسالة العلامة التجارية إلى قصة بصرية واضحة وجذابة تعكس هويتها وقيمها بطريقة عصرية ومؤثرة.', 'إنتاج عقاري سينمائي متكامل يبدأ من كتابة الفكرة والإخراج وصولا إلى التصوير والمونتاج النهائي.', 'فيلم عقاري متكامل', 'التحدي', 'احتاجت الغانم للإسكان إلى فيديو يعرض المشروع بوضوح وأجواء بصرية مصقولة، بعيدًا عن الشكل المعلوماتي التقليدي.', 'الحل', 'تعاملت لاسترادا مع المشروع كخط إنتاج متكامل، من صياغة الفكرة والسيناريو إلى إخراج التصوير والمونتاج النهائي لفيلم يعبر عن هوية المشروع.', null, null, 'المخرجات', 'فيلم المشروع', 'محتوى الفيديو', 'تحتاج قصة عقارية بتأثير بصري أقوى؟', 'تقدر لاسترادا تحول الفكرة والتصوير والمونتاج إلى فيلم مشروع واضح وسينمائي.', 'ابدأ مشروع فيديو');

with upsert_project as (select id from public.projects where slug = 'al-ghanem-housing')
insert into public.project_deliverables (project_id, locale, label, sort_order)
values
((select id from upsert_project), 'en', 'Script writing', 0),
((select id from upsert_project), 'en', 'Creative direction', 1),
((select id from upsert_project), 'en', 'Video production', 2),
((select id from upsert_project), 'en', 'Editing', 3),
((select id from upsert_project), 'en', 'Final reel delivery', 4),
((select id from upsert_project), 'ar', 'كتابة السيناريو', 0),
((select id from upsert_project), 'ar', 'الإخراج الإبداعي', 1),
((select id from upsert_project), 'ar', 'إنتاج الفيديو', 2),
((select id from upsert_project), 'ar', 'المونتاج', 3),
((select id from upsert_project), 'ar', 'تسليم الفيلم النهائي', 4);


with upsert_project as (select id from public.projects where slug = 'al-ghanem-housing')
insert into public.project_media (project_id, type, src, poster, alt_ar, alt_en, label_ar, label_en, is_cover, sort_order)
values
((select id from upsert_project), 'image', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Al-Ganem/videos/Cover%20Reel%20Alganem.jpg', null, 'فيديو إنتاج عقاري لشركة الغانم للإسكان من لاسترادا', 'Al Ghanem Housing cinematic video production by LA STRADA', 'غلاف فيلم المشروع', 'Project Film Cover', true, 0),
((select id from upsert_project), 'video', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Al-Ganem/videos/iscan%20alghanem%20--16.mp4', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Al-Ganem/videos/Cover%20Reel%20Alganem.jpg', 'الفيديو النهائي لشركة الغانم للإسكان من لاسترادا', 'Al Ghanem Housing final video production by LA STRADA', 'الفيلم النهائي', 'Final Film', false, 1);


-- elmo3afah
with upsert_project as (
  insert into public.projects (slug, status, category, accent, type, sort_order)
  values ('elmo3afah', 'published', 'social_media_management', 'red', 'Social Media', 2)
  on conflict (slug) do update set
    status = excluded.status,
    category = excluded.category,
    accent = excluded.accent,
    type = excluded.type,
    sort_order = excluded.sort_order
  returning id
)
delete from public.project_media where project_id = (select id from upsert_project);

with upsert_project as (select id from public.projects where slug = 'elmo3afah')
delete from public.project_deliverables where project_id = (select id from upsert_project);

with upsert_project as (select id from public.projects where slug = 'elmo3afah')
delete from public.project_translations where project_id = (select id from upsert_project);

with upsert_project as (select id from public.projects where slug = 'elmo3afah')
insert into public.project_translations (
  project_id, locale, title, client, type, description, summary, overview_title, challenge_title,
  challenge, solution_title, solution, success_title, success_story, deliverables_title,
  gallery_title, video_title, cta_title, cta_body, cta_label
)
values
((select id from upsert_project), 'en', 'Social Media | Elmo3afah Medical Center', 'Elmo3afah Medical Center', 'Social Media', 'Elmo3afah is an integrated medical center. LA STRADA worked on building a digital presence that reflects its range of services and medical professionalism. The work included social media visuals, clear educational messaging, and video content that helps audiences understand healthcare services in a simple and trustworthy way. The goal was to present the center as an approachable, professional, multi-specialty healthcare destination through organized and engaging content.', 'A social and content system for an integrated medical center, combining clear healthcare messaging, polished visual design, and educational video assets.', 'A digital presence for an integrated medical center', 'Challenge', 'Elmo3afah needed a digital presence that could explain its medical services clearly and credibly, while still feeling modern enough for social media and strong enough to build patient trust.', 'Solution', 'LA STRADA shaped a content system that combines medical design, educational messaging, video production, and social media storytelling, positioning the center as an integrated and approachable healthcare destination.', null, null, 'Deliverables', 'Content gallery', 'Project videos', 'Have a medical brand that needs trusted digital presence?', 'Let LA STRADA build a healthcare content system that is clear, engaging, and designed to turn trust into real contact.', 'Start a similar medical project'),
((select id from upsert_project), 'ar', 'منصات التواصل الاجتماعي | مركز المعافاة الطبي', 'مركز المعافاة الطبي', 'التواصل الاجتماعي', 'مركز المعافاة هو مركز طبي متكامل، وتعاونت معه لاسترادا لبناء حضور رقمي يعكس تعدد خدماته واحترافيته الطبية. شمل العمل تصميم محتوى بصري للسوشيال ميديا، وصناعة رسائل توعوية واضحة، وإنتاج فيديوهات تعريفية وتثقيفية تساعد الجمهور على فهم الخدمات الطبية بطريقة سهلة وموثوقة. الهدف كان تقديم المركز كوجهة صحية قريبة، احترافية، ومتعددة التخصصات عبر محتوى منظم وجذاب.', 'منظومة محتوى وسوشيال ميديا لمركز طبي متكامل، تجمع بين الرسائل الطبية الواضحة والتصميم البصري الجذاب والفيديوهات التوعوية.', 'حضور رقمي لمركز طبي متكامل', 'التحدي', 'احتاج مركز المعافاة إلى حضور رقمي يشرح خدماته الطبية بطريقة موثوقة وواضحة، مع الحفاظ على لغة بصرية حديثة تناسب السوشيال ميديا وتبني ثقة المرضى.', 'الحل', 'بنت لاسترادا نظام محتوى يجمع بين التصميم الطبي، الرسائل التوعوية، إنتاج الفيديو، ومحتوى السوشيال ميديا، ليظهر المركز كوجهة طبية متكاملة وسهلة الفهم والتواصل.', null, null, 'المخرجات', 'معرض المحتوى', 'فيديوهات المشروع', 'عندك مركز طبي محتاج حضور رقمي موثوق؟', 'خلّي لاسترادا تبني لك منظومة محتوى طبية واضحة، جذابة، وقادرة على تحويل الثقة إلى تواصل فعلي.', 'ابدأ مشروع طبي مشابه');

with upsert_project as (select id from public.projects where slug = 'elmo3afah')
insert into public.project_deliverables (project_id, locale, label, sort_order)
values
((select id from upsert_project), 'en', 'Social media content management', 0),
((select id from upsert_project), 'en', 'Medical post design', 1),
((select id from upsert_project), 'en', 'Educational video production', 2),
((select id from upsert_project), 'en', 'Short-form reel editing', 3),
((select id from upsert_project), 'en', 'Healthcare marketing copy', 4),
((select id from upsert_project), 'en', 'Unified campaign visuals', 5),
((select id from upsert_project), 'ar', 'إدارة محتوى السوشيال ميديا', 0),
((select id from upsert_project), 'ar', 'تصميم منشورات طبية', 1),
((select id from upsert_project), 'ar', 'إنتاج فيديوهات توعوية', 2),
((select id from upsert_project), 'ar', 'مونتاج ريلز ومحتوى قصير', 3),
((select id from upsert_project), 'ar', 'صياغة رسائل تسويقية طبية', 4),
((select id from upsert_project), 'ar', 'حضور بصري موحد للحملات', 5);


with upsert_project as (select id from public.projects where slug = 'elmo3afah')
insert into public.project_media (project_id, type, src, poster, alt_ar, alt_en, label_ar, label_en, is_cover, sort_order)
values
((select id from upsert_project), 'image', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/elmo3afah/images/%D8%B1%D8%B9%D9%80%D8%A7%D9%8A%D8%A9-%D8%B5%D8%AD%D9%8A%D8%A9-%D8%B9%D8%A7%D9%84%D9%8A%D8%A9-%D8%A7%D9%84%D8%AC%D9%88%D8%AF%D8%A9.jpg', null, 'منشور رعاية صحية عالية الجودة لمركز المعافاة', 'High-quality healthcare social post for Elmo3afah', 'حملة الرعاية الصحية', 'Healthcare Campaign', true, 0),
((select id from upsert_project), 'image', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/elmo3afah/images/%D8%A8%D8%AA%D8%AD%D8%B1%D8%AC%D9%83-%D8%A7%D8%A8%D8%AA%D8%B3%D8%A7%D9%85%D8%AA%D9%83-%D9%8A%D9%88%D9%85%D8%A7%D9%8B%D8%9F-%D8%A7%D9%84%D8%AA%D8%AD%D9%88%D9%84-%D9%85%D9%85%D9%83%D9%86-%D8%A8%D8%A7%D9%95%D8%B1%D8%A8%D8%AF-%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D9%81%D8%A7%D8%A9-15-%D8%A7%D8%A8%D8%B1%D9%8A%D9%84-2.jpg', null, 'منشور طبي عن تحول الابتسامة لمركز المعافاة', 'Dental smile transformation post for Elmo3afah', 'طب الأسنان', 'Dental Care', false, 1),
((select id from upsert_project), 'image', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/elmo3afah/images/%D9%85%D8%B4%D8%A7%D9%83%D9%84-%D8%A7%D9%84%D8%A8%D8%B4%D8%B1%D8%A9-%D8%A7%D9%84%D9%87%D8%A7-%D8%AD%D9%84-%D8%B7%D8%A8%D9%8A-%D8%A8%D8%AF%D9%88%D9%86-%D8%AA%D8%AC%D8%A7%D8%B1%D8%A8-%D8%B9%D8%B4%D9%88%D8%A7%D9%8A%D9%94%D9%8A%D8%A9---%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D9%81%D8%A7%D8%A9--16-%D8%A7%D8%A8%D8%B1%D9%8A%D9%84.jpg', null, 'منشور طبي عن حلول مشاكل البشرة لمركز المعافاة', 'Medical skincare solutions post for Elmo3afah', 'العناية بالبشرة', 'Skincare', false, 2),
((select id from upsert_project), 'video', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/elmo3afah/videos/%D8%B1%D8%AD%D9%84%D8%A9%20%D8%AF%D8%B1%D8%A7%D8%B3%D8%A9%20%D8%A7%D9%84%D8%A8%D8%B1%D9%88%D9%81%D8%B3%D8%B1%D8%A7.mp4', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/elmo3afah/images/%D8%B1%D8%B9%D9%80%D8%A7%D9%8A%D8%A9-%D8%B5%D8%AD%D9%8A%D8%A9-%D8%B9%D8%A7%D9%84%D9%8A%D8%A9-%D8%A7%D9%84%D8%AC%D9%88%D8%AF%D8%A9.jpg', 'فيديو رحلة دراسة البروفيسرا لمركز المعافاة', 'Elmo3afah educational profile video', 'فيديو تعريفي', 'Profile Video', false, 3),
((select id from upsert_project), 'video', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/elmo3afah/videos/%D8%B1%D8%AD%D9%85%D8%A9%20%D8%A7%D9%84%D9%86%D9%85%D8%B1%D8%A7%D9%88%D9%8A%20%D8%A7%D8%AE%D8%B5%D8%A7%D9%8A%D9%94%D9%8A%D8%A9%20%D8%B9%D9%84%D8%A7%D8%AC%20%D9%88%D8%B8%D9%8A%D9%81%D9%8A.mp4', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/elmo3afah/images/%D8%B1%D8%B9%D9%80%D8%A7%D9%8A%D8%A9-%D8%B5%D8%AD%D9%8A%D8%A9-%D8%B9%D8%A7%D9%84%D9%8A%D8%A9-%D8%A7%D9%84%D8%AC%D9%88%D8%AF%D8%A9.jpg', 'فيديو رحمة النمراوي أخصائية علاج وظيفي لمركز المعافاة', 'Elmo3afah occupational therapy specialist video', 'فيديو متخصص', 'Specialist Video', false, 4);


-- mega-cafe-jordan
with upsert_project as (
  insert into public.projects (slug, status, category, accent, type, sort_order)
  values ('mega-cafe-jordan', 'published', 'content_production', 'green', 'Photography', 3)
  on conflict (slug) do update set
    status = excluded.status,
    category = excluded.category,
    accent = excluded.accent,
    type = excluded.type,
    sort_order = excluded.sort_order
  returning id
)
delete from public.project_media where project_id = (select id from upsert_project);

with upsert_project as (select id from public.projects where slug = 'mega-cafe-jordan')
delete from public.project_deliverables where project_id = (select id from upsert_project);

with upsert_project as (select id from public.projects where slug = 'mega-cafe-jordan')
delete from public.project_translations where project_id = (select id from upsert_project);

with upsert_project as (select id from public.projects where slug = 'mega-cafe-jordan')
insert into public.project_translations (
  project_id, locale, title, client, type, description, summary, overview_title, challenge_title,
  challenge, solution_title, solution, success_title, success_story, deliverables_title,
  gallery_title, video_title, cta_title, cta_body, cta_label
)
values
((select id from upsert_project), 'en', 'Photoshoot | Mega Cafe Jordan', 'Mega Cafe', 'Photography', 'LA STRADA conducted a professional photoshoot for Mega Cafe in Jordan focused on menu items, including food, drinks, desserts, and cafe visuals. The work was designed to present products with high visual quality, strengthen the cafe''s social media presence, and support its digital marketing content with both still imagery and short-form video assets.', 'A food and beverage photoshoot built to elevate Mega Cafe''s menu and digital presence with polished product imagery and short-form reels.', 'Menu visuals with reel-ready energy', 'Challenge', 'Mega Cafe needed food and beverage visuals that could make menu items feel clear, appetizing, and usable across social media, not just a basic product shoot.', 'Solution', 'LA STRADA built a visual set around drinks, desserts, and cafe moments, then supported the stills with short-form video reels for a stronger digital presence.', null, null, 'Deliverables', 'Cafe gallery', 'Video assets', 'Want your menu to look as good online as it feels in-store?', 'LA STRADA can produce the photography and reels your brand needs for sharper social media presence.', 'Start a photoshoot'),
((select id from upsert_project), 'ar', 'جلسة تصوير | ميجا كافيه الأردن', 'ميجا كافيه', 'التصوير الاحترافي', 'قامت لاسترادا بتنفيذ جلسة تصوير احترافية لميجا كافيه في الأردن ركزت على عناصر قائمة الطعام، بما في ذلك الأطعمة والمشروبات والحلويات وأجواء الكافيه. صُمم العمل لعرض المنتجات بجودة بصرية عالية، وتعزيز حضور الكافيه على منصات التواصل الاجتماعي، ودعم المحتوى التسويقي بصور ثابتة وفيديوهات قصيرة.', 'جلسة تصوير للأطعمة والمشروبات ترفع جودة ظهور قائمة ميجا كافيه وحضوره الرقمي بصور منتجات مصقولة وريلز قصيرة.', 'صور قائمة طعام بطاقة تناسب الريلز', 'التحدي', 'احتاج ميجا كافيه إلى صور أطعمة ومشروبات تظهر المنتجات بوضوح وجاذبية وتصلح للاستخدام على السوشيال ميديا، وليس مجرد تصوير منتجات تقليدي.', 'الحل', 'بنت لاسترادا مجموعة بصرية تشمل المشروبات والحلويات ولحظات الكافيه، مع دعم الصور بفيديوهات قصيرة لرفع قوة الحضور الرقمي.', null, null, 'المخرجات', 'معرض الكافيه', 'محتوى الفيديو', 'عايز قائمة منتجاتك تظهر أونلاين بنفس جودة التجربة؟', 'تقدر لاسترادا تنتج الصور والريلز اللي تحتاجها علامتك لحضور أقوى على السوشيال ميديا.', 'ابدأ جلسة تصوير');

with upsert_project as (select id from public.projects where slug = 'mega-cafe-jordan')
insert into public.project_deliverables (project_id, locale, label, sort_order)
values
((select id from upsert_project), 'en', 'Food photography', 0),
((select id from upsert_project), 'en', 'Drink photography', 1),
((select id from upsert_project), 'en', 'Dessert photography', 2),
((select id from upsert_project), 'en', 'Social media reels', 3),
((select id from upsert_project), 'en', 'Visual content direction', 4),
((select id from upsert_project), 'ar', 'تصوير الأطعمة', 0),
((select id from upsert_project), 'ar', 'تصوير المشروبات', 1),
((select id from upsert_project), 'ar', 'تصوير الحلويات', 2),
((select id from upsert_project), 'ar', 'ريلز للسوشيال ميديا', 3),
((select id from upsert_project), 'ar', 'إخراج المحتوى البصري', 4);


with upsert_project as (select id from public.projects where slug = 'mega-cafe-jordan')
insert into public.project_media (project_id, type, src, poster, alt_ar, alt_en, label_ar, label_en, is_cover, sort_order)
values
((select id from upsert_project), 'image', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Photoshoot%20%7C%20Mega%20Caf%C3%A9/images/%D8%A8%D9%88%D8%B8%D8%A9.jpg', null, 'تصوير بوظة ميجا كافيه من لاسترادا', 'Mega Cafe ice cream product photo by LA STRADA', 'بوظة', 'Ice Cream', true, 0),
((select id from upsert_project), 'image', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Photoshoot%20%7C%20Mega%20Caf%C3%A9/images/%D8%AD%D9%84%D9%88%D9%8A%D8%A7%D8%AA%20(1).jpg', null, 'تصوير حلويات ميجا كافيه من لاسترادا', 'Mega Cafe dessert product photo by LA STRADA', 'حلويات', 'Desserts', false, 1),
((select id from upsert_project), 'image', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Photoshoot%20%7C%20Mega%20Caf%C3%A9/images/%D8%AD%D9%84%D9%88%D9%8A%D8%A7%D8%AA%20(4).jpg', null, 'تصوير منتجات حلويات ميجا كافيه من لاسترادا', 'Mega Cafe sweets product photo by LA STRADA', 'حلويات', 'Sweets', false, 2),
((select id from upsert_project), 'video', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Photoshoot%20%7C%20Mega%20Caf%C3%A9/videos/La%20Strada%20Story%20Mega.mp4', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Photoshoot%20%7C%20Mega%20Caf%C3%A9/images/%D8%A8%D9%88%D8%B8%D8%A9.jpg', 'ستوري ميجا كافيه من لاسترادا', 'Mega Cafe story reel by LA STRADA', 'ستوري', 'Story Reel', false, 3),
((select id from upsert_project), 'video', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Photoshoot%20%7C%20Mega%20Caf%C3%A9/videos/Maga%20Cafe%20Reel%201-2.mp4', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Photoshoot%20%7C%20Mega%20Caf%C3%A9/images/%D8%AD%D9%84%D9%88%D9%8A%D8%A7%D8%AA%20(1).jpg', 'ريل ميجا كافيه من لاسترادا', 'Mega Cafe reel by LA STRADA', 'ريل', 'Reel', false, 4),
((select id from upsert_project), 'video', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Photoshoot%20%7C%20Mega%20Caf%C3%A9/videos/Mega%20Reel%202.mp4', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Photoshoot%20%7C%20Mega%20Caf%C3%A9/images/%D8%AD%D9%84%D9%88%D9%8A%D8%A7%D8%AA%20(1).jpg', 'الريل الثاني لميجا كافيه من لاسترادا', 'Mega Cafe second reel by LA STRADA', 'ريل 2', 'Reel 2', false, 5),
((select id from upsert_project), 'video', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Photoshoot%20%7C%20Mega%20Caf%C3%A9/videos/Mega%20Reel%203.mp4', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/Photoshoot%20%7C%20Mega%20Caf%C3%A9/images/%D8%A8%D9%88%D8%B8%D8%A9.jpg', 'الريل الثالث لميجا كافيه من لاسترادا', 'Mega Cafe third reel by LA STRADA', 'ريل 3', 'Reel 3', false, 6);


-- oliga-rose
with upsert_project as (
  insert into public.projects (slug, status, category, accent, type, sort_order)
  values ('oliga-rose', 'published', 'graphic_design', 'purple', 'Brand Identity', 4)
  on conflict (slug) do update set
    status = excluded.status,
    category = excluded.category,
    accent = excluded.accent,
    type = excluded.type,
    sort_order = excluded.sort_order
  returning id
)
delete from public.project_media where project_id = (select id from upsert_project);

with upsert_project as (select id from public.projects where slug = 'oliga-rose')
delete from public.project_deliverables where project_id = (select id from upsert_project);

with upsert_project as (select id from public.projects where slug = 'oliga-rose')
delete from public.project_translations where project_id = (select id from upsert_project);

with upsert_project as (select id from public.projects where slug = 'oliga-rose')
insert into public.project_translations (
  project_id, locale, title, client, type, description, summary, overview_title, challenge_title,
  challenge, solution_title, solution, success_title, success_story, deliverables_title,
  gallery_title, video_title, cta_title, cta_body, cta_label
)
values
((select id from upsert_project), 'en', 'Brand Identity | Oliga Rose', 'Oliga Rose', 'Brand Identity', 'Olga Rose was developed as a complete branding journey, starting from the core logo design and extending through to the full packaging system. Every element was carefully crafted to reflect a cohesive visual identity that communicates elegance, consistency, and brand character across all touchpoints. The result is a refined and unified brand experience that brings the Olga Rose vision to life in a clear and memorable way.', 'A complete identity and packaging system for a beauty brand, built to feel elegant, cohesive, and memorable across every touchpoint.', 'A complete beauty brand system', 'Challenge', 'Oliga Rose needed a visual identity that could move beyond a logo and feel consistent across packaging, print, and digital touchpoints without losing its premium beauty character.', 'Solution', 'LA STRADA built the brand as a cohesive identity journey, from the core mark to the full packaging direction, balancing elegance, clarity, and shelf-ready product presence.', null, null, 'Deliverables', 'Identity gallery', 'Video assets', 'Have a product brand that needs this level of presence?', 'Let LA STRADA shape the identity, packaging, and launch story into one memorable system.', 'Start a similar project'),
((select id from upsert_project), 'ar', 'الهوية التجارية | شركة أولجا روز', 'أولجا روز', 'الهوية البصرية', 'تم تطوير هوية علامة أولغا روز التجارية كرحلة متكاملة، بدءًا من تصميم الشعار الأساسي وصولًا إلى نظام التغليف الكامل. صُمم كل عنصر بعناية فائقة ليعكس هوية بصرية متماسكة تُعبّر عن الأناقة والاتساق وشخصية العلامة التجارية في جميع نقاط التفاعل. والنتيجة هي تجربة علامة تجارية راقية وموحدة تُجسّد رؤية أولغا روز بوضوح وبطريقة لا تُنسى.', 'نظام هوية وتغليف متكامل لعلامة تجميلية، مصمم ليظهر بأناقة واتساق وذاكرة بصرية قوية عبر كل نقاط التواصل.', 'نظام علامة تجميلية متكامل', 'التحدي', 'احتاجت أولجا روز إلى هوية بصرية لا تتوقف عند الشعار، بل تمتد لتظهر باتساق على التغليف والطباعة والحضور الرقمي مع الحفاظ على طابع جمالي راق.', 'الحل', 'بنت لاسترادا الهوية كرحلة متكاملة، من العلامة الأساسية إلى اتجاه التغليف الكامل، مع موازنة واضحة بين الأناقة والوضوح والحضور القوي للمنتج.', null, null, 'المخرجات', 'معرض الهوية', 'محتوى الفيديو', 'عندك علامة منتج محتاجة حضور بنفس القوة؟', 'خلّي لاسترادا تصمم الهوية والتغليف وقصة الإطلاق كنظام واحد لا يُنسى.', 'ابدأ مشروع مشابه');

with upsert_project as (select id from public.projects where slug = 'oliga-rose')
insert into public.project_deliverables (project_id, locale, label, sort_order)
values
((select id from upsert_project), 'en', 'Logo design', 0),
((select id from upsert_project), 'en', 'Visual identity', 1),
((select id from upsert_project), 'en', 'Packaging system', 2),
((select id from upsert_project), 'en', 'Print design', 3),
((select id from upsert_project), 'en', 'Brand presentation', 4),
((select id from upsert_project), 'ar', 'تصميم الشعار', 0),
((select id from upsert_project), 'ar', 'الهوية البصرية', 1),
((select id from upsert_project), 'ar', 'نظام التغليف', 2),
((select id from upsert_project), 'ar', 'تصميمات الطباعة', 3),
((select id from upsert_project), 'ar', 'عرض العلامة التجارية', 4);


with upsert_project as (select id from public.projects where slug = 'oliga-rose')
insert into public.project_media (project_id, type, src, poster, alt_ar, alt_en, label_ar, label_en, is_cover, sort_order)
values
((select id from upsert_project), 'image', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/oliga-rose/images/%D9%85%D8%B3%D8%B7%D8%B1%D8%A9-%D8%A7%D9%88%D9%84%D9%8A%D9%82%D8%A7-_01.jpg.jpeg', null, 'تصميم عبوات أولجا روز من لاسترادا', 'Oliga Rose packaging design showcase by LA STRADA', 'التغليف', 'Packaging', true, 0),
((select id from upsert_project), 'image', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/oliga-rose/images/%D9%85%D8%B3%D8%B7%D8%B1%D8%A9-%D8%A7%D9%88%D9%84%D9%8A%D9%82%D8%A7-_022.jpg', null, 'تصميم الهوية البصرية لأولجا روز من لاسترادا', 'Oliga Rose visual identity artwork by LA STRADA', 'الهوية البصرية', 'Visual Identity', false, 1),
((select id from upsert_project), 'video', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/oliga-rose/videos/%D9%85%D9%88%D8%B4%D9%86%20%D8%A7%D9%84%D9%87%D9%88%D9%8A%D8%A9%20%D8%A7%D9%84%D8%A8%D8%B5%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%88%D9%84%D9%8A%D9%82%D8%A7.mp4', 'https://pub-9152d84694a54c949533f907a0433921.r2.dev/lastrada-media/oliga-rose/images/%D9%85%D8%B3%D8%B7%D8%B1%D8%A9-%D8%A7%D9%88%D9%84%D9%8A%D9%82%D8%A7-_01.jpg.jpeg', 'فيديو هوية وتغليف أولجا روز من لاسترادا', 'Oliga Rose brand identity and packaging video by LA STRADA', 'فيديو المشروع', 'Project Reel', false, 2);

commit;
