'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignIn() {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            code,
            redirect: false
        });
    
        if (result?.ok) {
            window.location.replace('/dashboard');
        } else {
            alert('رمز غير صحيح');
        }
  
        try {
            const result = await signIn('credentials', {
                code,
                redirect: false,
                callbackUrl: '/dashboard'
            });

            if (result?.ok) {
                window.location.href = '/dashboard';
            } else {
                alert('رمز غير صحيح');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-center text-2xl font-bold">تسجيل الدخول</h2>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            رمز التحقق
                        </label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="mt-1 block w-full p-2 border rounded-md"
                            required
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'جاري التحقق...' : 'تحقق'}
                    </button>
                </form>
            </div>
        </div>
    );
}