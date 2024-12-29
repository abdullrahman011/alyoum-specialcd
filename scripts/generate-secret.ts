import speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';

// إنشاء السر
const secret = speakeasy.generateSecret({
    name: "Alyoum Special Dashboard"
});

console.log('\n=== معلومات المصادقة ===');
console.log('\nالمفتاح السري (ضعه في .env.local):\n');
console.log('TOTP_SECRET=' + secret.base32);
console.log('\nرابط QR Code (استخدمه مرة واحدة فقط):\n');

// إنشاء QR Code
QRCode.toDataURL(secret.otpauth_url!)
    .then((url: string) => {
        console.log(url);
        console.log('\n=== احتفظ بهذه المعلومات في مكان آمن ===\n');
    })
    .catch((err: Error) => {
        console.error('خطأ في إنشاء QR Code:', err);
    });