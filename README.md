# ARİJ OYUNU + Supabase

هذه النسخة تربط دخول الطلاب ولوحة تحكم المعلم بـ Supabase.

## 1) إعداد Supabase
1. أنشئ مشروعًا جديدًا في Supabase.
2. افتح **SQL Editor** وشغّل كامل ملف `supabase.sql`.
3. من **Authentication > Users** أنشئ حساب المعلم (Email + Password).
4. انسخ UUID الخاص بحساب المعلم.
5. في SQL Editor نفّذ:
   `insert into public.admins(user_id) values ('UUID-HERE');`
6. افتح `supabase-config.js` وضع:
   - رابط المشروع في `SUPABASE_URL`
   - Publishable Key في `SUPABASE_PUBLISHABLE_KEY`

## 2) لوحة التحكم
افتح:
`/admin.html`
وسجّل بحساب المعلم. تستطيع إضافة طالب، توليد رمز، تحديد الألعاب، إيقاف/تفعيل الطالب وحذفه.

## 3) دخول الطالب
الصفحة الرئيسية `/index.html` تتحقق من الرمز عبر Supabase وتعرض الألعاب المخصصة فقط.
كما أن كل لعبة تتحقق مرة ثانية من الرمز والصلاحية، لذلك لا يكفي تغيير رابط اللعبة يدويًا.

## الأمان
لا تضع Secret/Service Role Key في ملفات GitHub أو المتصفح. استخدم Publishable Key فقط مع RLS. المفتاح السري يجب أن يبقى على الخادم.

## الألعاب
1. Sayı Avı
2. Harf Kutusu
3. Kelime Kur
4. Hece Oyunu
5. Renk Boya
6. Balonla Uçuş
7. Hedefi Vur
8. Balonları Say
9. Kelime Kartları
