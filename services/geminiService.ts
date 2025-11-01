import { GoogleGenAI, Type } from "@google/genai";
import { InteractiveExplanation } from "../types";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

const callGemini = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate content from Gemini API.");
  }
};

export const generateLessonPlan = async (lessonTitle: string, strategyName: string): Promise<string> => {
  const prompt = `
    أنت خبير استراتيجي في تصميم الدروس التعليمية ومبدع في صياغة المحتوى.
    مهمتك هي إنشاء خطة درس تفصيلية، تفاعلية، ونشطة للموضوع التالي: "${lessonTitle}".

    يجب أن تتبع الخطة بشكل صارم ومبدع استراتيجية: "${strategyName}".

    **متطلبات الخطة:**
    1.  **العنوان:** عنوان الدرس والاستراتيجية المتبعة.
    2.  **الأهداف:** أهداف سلوكية واضحة وقابلة للقياس (معرفية، مهارية، وجدانية).
    3.  **المواد والأدوات:** قائمة بالمواد اللازمة لتنفيذ الدرس.
    4.  **إجراءات الدرس:** خطوات تفصيلية ومنظمة لكيفية تطبيق استراتيجية "${strategyName}" على موضوع "${lessonTitle}". يجب أن توضح دور كل من المعلم والطالب في كل خطوة.
    5.  **الأنشطة التفاعلية:** اقترح أنشطة ملموسة ومبتكرة تجعل الدرس ممتعًا وتفاعليًا.
    6.  **التقويم:** أساليب تقويم متنوعة (قبلي، تكويني، ختامي) لقياس مدى تحقق الأهداف.
    7.  **الواجب المنزلي (اختياري):** نشاط إثرائي يعزز فهم الطلاب.

    **تنسيق الإجابة:**
    - استخدم تنسيق ماركداون (Markdown) لتسهيل القراءة.
    - استخدم العناوين الرئيسية (#)، والعناوين الفرعية (##)، والقوائم النقطية (*) أو الرقمية (1.).
    - استخدم التنسيق الغامق (**) للكلمات المفتاحية والمهمة.
  `;
  return callGemini(prompt);
};

export const explainStrategy = async (strategyName: string): Promise<string> => {
  const prompt = `
    بصفتك خبيرًا في طرق التدريس الحديثة، اشرح استراتيجية "${strategyName}" بطريقة مبسطة وواضحة للمعلمين.
    
    **المطلوب:**
    1.  **تعريف الاستراتيجية:** ما هي هذه الاستراتيجية بكلمات سهلة ومباشرة؟
    2.  **الهدف الرئيسي:** ما هو الهدف الأساسي من استخدامها في الفصل الدراسي؟
    3.  **أهميتها للطلاب:** لماذا تعتبر هذه الاستراتيجية فعالة ومفيدة لتطوير مهارات الطلاب؟
    4.  **خطوات التطبيق:** كيف يمكن للمعلم تطبيقها بخطوات عملية وموجزة؟ (اذكر 3-4 خطوات رئيسية).
    5.  **مثال تطبيقي:** قدم مثالاً بسيطًا وعمليًا لتوضيح كيفية عمل الاستراتيجية في درس ما.

    **تنسيق الإجابة:**
    - استخدم تنسيق ماركداون.
    - استخدم العناوين الرئيسية (##) والنقاط (*) لتنظيم الشرح وجعله سهل القراءة.
    - اجعل اللغة واضحة ومباشرة.
  `;
  return callGemini(prompt);
};

export const explainLessonInteractively = async (lessonTitle: string, strategyName: string): Promise<InteractiveExplanation> => {
    const prompt = `
    أنت معلم مبدع وخبير في تصميم الأنشطة التفاعلية.
    مهمتك هي إنشاء شرح تفاعلي لموضوع: "${lessonTitle}" باستخدام استراتيجية: "${strategyName}".
    يجب أن تكون الاستجابة **حصريًا** بتنسيق JSON.

    **القواعد:**
    1.  قم بتحليل استراتيجية "${strategyName}" وقسمها إلى خطواتها العملية والتفاعلية الأساسية. **يجب أن يتوافق عدد الخطوات مع طبيعة الاستراتيجية** (مثلاً، استراتيجية "القبعات الست" يجب أن تحتوي على 6 خطوات، واحدة لكل قبعة).
    2.  أنشئ كائن JSON يحتوي على مفتاح "interactive_steps".
    3.  يجب أن تكون قيمة "interactive_steps" مصفوفة من الكائنات، حيث يمثل كل كائن خطوة واحدة.
    4.  يجب أن يحتوي كل كائن في المصفوفة على:
        a.  "title": عنوان قصير وواضح للخطوة (مثال: "القبعة البيضاء: الحقائق").
        b.  "icon": اختر اسم أيقونة واحد **فقط** باللغة الإنجليزية من القائمة التالية التي تصف الخطوة بشكل أفضل: 
            ["predict", "question", "clarify", "summarize", "group", "discuss", "create", "present", "evaluate", "reflect", "search", "play", "brainstorm", "map", "white_hat", "red_hat", "black_hat", "yellow_hat", "green_hat", "blue_hat"]
        c.  "content": شرح تفصيلي وتفاعلي لهذه الخطوة، مطبق بشكل مباشر وعملي على درس "${lessonTitle}". يجب أن يكون المحتوى موجهًا للطالب ويستخدم تنسيق ماركداون.

    **مثال للناتج المطلوب لاستراتيجية "القبعات الست":**
    \`\`\`json
    {
      "interactive_steps": [
        {
          "title": "القبعة البيضاء: الحقائق",
          "icon": "white_hat",
          "content": "لنفكر كعلماء! ما هي **الحقائق والمعلومات** التي نعرفها عن '${lessonTitle}'؟ لنجمع البيانات فقط، بدون آراء."
        },
        {
          "title": "القبعة الحمراء: المشاعر",
          "icon": "red_hat",
          "content": "الآن، اتبعوا حدسكم! ما هو **شعوركم** تجاه '${lessonTitle}'؟ هل هو ممتع، صعب، مثير؟ عبروا عن مشاعركم بحرية."
        },
        {
          "title": "القبعة السوداء: المخاطر",
          "icon": "black_hat",
          "content": "لنكن حذرين. ما هي **الصعوبات أو المشاكل** المحتملة في فهم '${lessonTitle}'؟ ما هي نقاط الضعف في أفكارنا؟"
        },
        {
          "title": "القبعة الصفراء: الإيجابيات",
          "icon": "yellow_hat",
          "content": "حان وقت التفاؤل! ما هي **الفوائد والجوانب المشرقة** لموضوع '${lessonTitle}'؟ لماذا هو مهم ومفيد لنا؟"
        },
        {
          "title": "القبعة الخضراء: الإبداع",
          "icon": "green_hat",
          "content": "أطلقوا العنان لإبداعكم! ما هي **الأفكار الجديدة والمختلفة** التي يمكننا استكشافها حول '${lessonTitle}'؟ لا توجد حدود!"
        },
        {
          "title": "القبعة الزرقاء: التنظيم",
          "icon": "blue_hat",
          "content": "أخيرًا، لننظم أفكارنا. ما الذي تعلمناه من كل قبعة؟ كيف يمكننا **تلخيص** رحلتنا ووضع خطة عمل للمضي قدمًا في درس '${lessonTitle}'؟"
        }
      ]
    }
    \`\`\`

    **ملاحظة هامة:** لا تضف أي نص أو توضيحات خارج كائن JSON. يجب أن تكون الاستجابة كائن JSON صالحًا فقط.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });
    const jsonText = response.text.trim();
    // A simple check to ensure we got something that looks like JSON
    if (!jsonText.startsWith('{') || !jsonText.endsWith('}')) {
        throw new Error("Invalid JSON response received from API.");
    }
    const parsedJson = JSON.parse(jsonText);
    return { strategy: strategyName, ...parsedJson };
  } catch (error) {
    console.error("Error calling or parsing Gemini JSON response:", error);
    throw new Error("Failed to generate interactive content from Gemini API.");
  }
};