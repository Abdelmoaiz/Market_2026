const { ipcRenderer } = require('electron');

let username = document.querySelector("#username");
let password = document.querySelector("#password");
let btnSignIn = document.querySelector("button"); // الآن نستخدم الزر مباشرة

// جلب المستخدمين المخزنين أو إنشاء مصفوفة فارغة
let users = localStorage.allUsers ? JSON.parse(localStorage.allUsers) : [];

// حفظ اسم المستخدم الحالي
let userNameView = "";

// زر تسجيل الدخول
btnSignIn.addEventListener("click", (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة

    const enteredUser = username.value.trim();
    const enteredPass = password.value.trim();

    let authenticated = false;
    let job = "";

    // التحقق من المستخدمين الافتراضيين
    if (enteredUser === 'عبدالمعز' && enteredPass === '0164342246') {
        authenticated = true;
        job = 'it';
    } else if (enteredUser === 'admin' && enteredPass === '1122') {
        authenticated = true;
        job = 'it';
    } else {
        // التحقق من المستخدمين المخزنين
        for (let i = 0; i < users.length; i++) {
            if (enteredUser === users[i].user && enteredPass === users[i].password) {
                authenticated = true;
                job = users[i].job || ""; // إذا كان لديك وظيفة مخزنة
                break;
            }
        }
    }

    if (authenticated) {
        // حفظ المستخدم الحالي
        userNameView = enteredUser;
        localStorage.setItem('userNameView', userNameView);
        localStorage.setItem('userJob', job);

        // إرسال البيانات إلى Main Process
        let date = new Date();
        let dateNow = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
        let timeNow = `${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}:${String(date.getSeconds()).padStart(2,'0')}`;

        ipcRenderer.send('userNameView', { user: userNameView, date: dateNow, time: timeNow });

        // الانتقال للصفحة الرئيسية
        window.location.href = "./Component/home/home.html";
    } else {
        alert("اسم المستخدم أو كلمة المرور غير صحيحة!");
    }
});
