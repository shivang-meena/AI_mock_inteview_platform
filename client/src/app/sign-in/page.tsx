"use client"
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading  from "./component/Loading"
import {useTheme} from "../../context/ThemeContext"

export default function LoginPage() {
    const {dark,setdark}=useTheme();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    // const [dark, setdark] = useState<boolean>(false);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [showpass, setshowpass] = useState<boolean>(false);

    const [error, setError] = useState<string>("");

    const bg = dark ? ' bg-[#0E0E10]' : 'bg-[#F4F4F3]';
    const surface = dark ? 'bg-[#171719]' : 'bg-white';
    const text = dark ? 'text-[#F5F5F4]' : 'text-[#141414]';
    const line = dark ? 'border-[#2A2A2D]' : 'border-[#E0E0DD]';

    const markBg = dark ? 'bg-[#F5F5F4]' : 'bg-[#141414]';
    const markText = dark ? 'text-[#0E0E10]' : 'text-[#F4F4F3]';
    const border = dark ? 'border-[#F5F5F4]' : 'border-[#1b1b1a]';
    const dotBorder = dark ? 'border-[#F5F5F4]' : 'border-[#141414]';

    const mutedText = dark ? 'text-[#9B9B98]' : 'text-[#737373]';
    const inputBg = dark ? 'bg-[#1F1F22]' : 'bg-[#F9FAFB]';
    const placeholderText = dark ? 'placeholder:text-[#9B9B98]' : 'placeholder:text-[#9CA3AF]';
    const focusBorder = dark ? 'focus:border-[#F5F5F4]' : 'focus:border-[#141414]';
    const hoverBorder = dark ? 'hover:border-[#F5F5F4]' : 'hover:border-[#141414]';
    const hoverText = dark ? 'hover:text-[#F5F5F4]' : 'hover:text-[#141414]';
    const hoverBg = dark ? 'hover:bg-[#171719]' : 'hover:bg-[#E0E0DD]';
    const btnBg = dark ? 'bg-[#F5F5F4]' : 'bg-[#141414]';
    const btnText = dark ? 'text-[#0E0E10]' : 'text-[#F4F4F3]';
    const dividerLine = dark ? 'before:bg-[#2A2A2D] after:bg-[#2A2A2D]' : 'before:bg-[#E0E0DD] after:bg-[#E0E0DD]';

    const errorBg = dark ? 'bg-red-900/20' : 'bg-red-50';
    const errorBorder = dark ? 'border-red-800' : 'border-red-200';


    async function handlesubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
     
        if (!email.trim() || !password.trim()) {
            setError("Please fill in all required fields.");
            return;
        }
        setLoading(true);

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res?.error) {
                setLoading(false);
                setError(res.error);
                return;
            }

            if (res?.ok) {
                setLoading(false);
                router.push("/Dashboard"); 
            }

        } catch (err) {
            console.log(err);
            setError("Something went wrong. Please try again.");
        }
    }

    if (loading) {
        return <Loading dark={dark} label={"Logging in"}/>
    }
    const handleInput = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
        if (error) setError("");
    };

    return (
        <main className={`min-h-screen ${bg} ${text} font-['Work_Sans',sans-serif] transition-colors duration-300`}>

            {/* TOPBAR */}
            <header className={`sticky top-0 z-30 flex items-center gap-3.5 py-3.5 px-7 ${bg} border-b ${line} transition-colors duration-300 max-[720px]:py-3 max-[720px]:px-4`}>
                <Link href="/" className="flex items-center gap-[11px] no-underline text-inherit">
                    <div className="flex items-center gap-[11px]">
                        <div className={`w-9 h-9 rounded-[10px] grid pt-1 place-items-center ${markBg}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
                                <defs>
                                    <linearGradient id="waveGrad" x1="86" y1="96" x2="426" y2="430" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" stopColor="#10B981" />
                                        <stop offset="100%" stopColor="#0EA5E9" />
                                    </linearGradient>
                                </defs>
                                <path fill="url(#waveGrad)" d="M150 96 H362 A64 64 0 0 1 426 160 V292 A64 64 0 0 1 362 356 H0 L0 356 L150 356 A64 64 0 0 1 86 292 V160 A64 64 0 0 1 150 96 Z" />
                                <g stroke="#FFFFFF" strokeWidth="22" strokeLinecap="round">
                                    <line x1="176" y1="202" x2="176" y2="250" />
                                    <line x1="216" y1="178" x2="216" y2="274" />
                                    <line x1="256" y1="156" x2="256" y2="296" />
                                    <line x1="296" y1="178" x2="296" y2="274" />
                                    <line x1="336" y1="202" x2="336" y2="250" />
                                </g>
                            </svg>
                        </div>
                        <div className={`font-['Bricolage_Grotesque'] font-bold text-lg tracking-[-0.3px] ${text}`}>Inteview Platform</div>
                    </div>
                </Link>

                <div className="ml-auto flex items-center gap-3">
                    <div className={`flex items-center gap-[7px] text-xs font-semibold ${surface} border ${line} ${text} py-[7px] px-[13px] rounded-[30px] whitespace-nowrap max-[720px]:py-[9px] max-[720px]:px-[11px] max-[720px]:[&>span:last-child]:hidden`}>
                        <span className="relative w-[7px] h-[7px] rounded-full bg-[#55a51c]">
                            <span className={`absolute inset-[-3px] rounded-full border-2 ${dotBorder} opacity-0 animate-ping`} />
                        </span>
                        <span>AI ready</span>
                    </div>

                    <button className={`w-[38px] h-[38px] rounded-[11px] border grid place-items-center transition-colors flex-shrink-0 cursor-pointer ${border} ${line} ${surface} ${text}`} aria-label="Toggle theme"
                        onClick={() => setdark(prev => !prev)}
                    >
                        {dark ? (
                            <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M19.4 4.6l-1.8 1.8M6.4 17.6l-1.8 1.8" /></svg>
                        ) : (
                            <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13.5A8 8 0 0 1 10.5 4 8 8 0 1 0 20 13.5z" /></svg>
                        )}
                    </button>

                    {/* Changed from Log in to Sign up */}
                    <Link
                        href="/sign-up"
                        className={`inline-flex items-center gap-[9px] border ${line} py-[9px] px-[15px] rounded-xl text-[13px] font-semibold ${surface} ${text} no-underline ${hoverBorder} transition-all duration-200`}
                    >
                        Sign up
                    </Link>
                </div>
            </header>

            {/* CONTENT */}
            <div className="max-w-[1040px] w-full mx-auto pt-8 px-6 pb-[60px] flex flex-col gap-[22px] max-[720px]:pt-6 max-[720px]:px-4 max-[720px]:pb-[50px]">
                <section className="flex justify-center py-3">

                    <div className={`w-full max-w-[460px] ${surface} border ${line} rounded-[18px] p-7 transition-colors duration-300 max-[440px]:p-5`}>

                        <div className="mb-1">
                            <h2 className={`font-['Bricolage_Grotesque',sans-serif] text-[22px] font-[750] tracking-[-.5px] ${text}`}>
                                Welcome back
                            </h2>
                        </div>
                        <p className={`text-[13.5px] ${mutedText} mb-[22px]`}>
                            Log in to access your dashboard and continue your mock interviews.
                        </p>

                        {/* --- ERROR MESSAGE BOX --- */}
                        {error && (
                            <div className={`mb-4 flex items-center gap-2 text-red-500 text-[13px] font-medium ${errorBg} border ${errorBorder} rounded-lg p-3`}>
                                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <form onSubmit={(e) => handlesubmit(e)} className="flex flex-col gap-4">

                            <div>
                                <label htmlFor="email" className={`block text-[12.5px] font-semibold ${mutedText} mb-2`}>
                                    Email
                                </label>
                                <input
                                    id="email"
                                    value={email}
                                    onChange={handleInput(setemail)}
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className={`w-full border ${line} rounded-[14px] ${inputBg} ${text} py-3 px-[15px] text-[13.5px] ${placeholderText} focus:outline-none ${focusBorder} transition-colors duration-200`}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className={`block text-[12.5px] font-semibold ${mutedText} mb-2`}>
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={(showpass) ? "text" : "password"}
                                        value={password}
                                        onChange={handleInput(setpassword)}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        className={`w-full border ${line} rounded-[14px] ${inputBg} ${text} py-3 pl-[15px] pr-11 text-[13.5px] ${placeholderText} focus:outline-none ${focusBorder} transition-colors duration-200`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setshowpass(prev => !prev)}
                                        className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 border-0 bg-transparent ${mutedText} rounded-lg grid place-items-center cursor-pointer ${hoverText} ${hoverBg} transition-all duration-200`}
                                        aria-label="Show password"
                                    >
                                        {(showpass) ?
                                            <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                            </svg>
                                            :
                                            <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
                                            </svg>}
                                    </button>
                                </div>

                                {/* Forgot Password Link */}
                                <div className="flex justify-end mt-2">
                                    <a href="#" className={`text-[12.5px] font-medium ${mutedText} ${hoverText} transition-colors duration-200`}>
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`inline-flex items-center justify-center gap-[9px] border border-transparent mt-1 py-3 px-5 rounded-xl text-sm font-semibold ${btnBg} ${btnText} cursor-pointer hover:opacity-85 disabled:opacity-[.45] disabled:cursor-not-allowed transition-all duration-200`}
                            >
                                Log in
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </button>
                        </form>

                        <div className={`flex items-center gap-3 my-[22px] ${mutedText} text-[12.5px] font-medium before:content-[''] before:flex-1 before:h-px after:content-[''] after:flex-1 after:h-px ${dividerLine}`}>
                            <span>or sign in with</span>
                        </div>

                        <div className="flex gap-2.5 max-[440px]:flex-col">
                            <button  className={`flex-1 inline-flex items-center justify-center gap-[9px] border ${line} py-3 px-5 rounded-xl text-sm font-semibold ${surface} ${text} cursor-pointer ${hoverBorder} transition-all duration-200`}
                             onClick={() => signIn("google", { callbackUrl: "/Dashboard" })}
                            >
                                <span className={`w-[22px] h-[22px] rounded-[7px] grid place-items-center shrink-0 font-['Bricolage_Grotesque',sans-serif] font-bold text-[10.5px] ${inputBg} ${text}`}>
                                    G
                                </span>
                                Google
                            </button>
                            <button className={`flex-1 inline-flex items-center justify-center gap-[9px] border ${line} py-3 px-5 rounded-xl text-sm font-semibold ${surface} ${text} cursor-pointer ${hoverBorder} transition-all duration-200`}
                             onClick={() => signIn("github", { callbackUrl: "/Dashboard" })}
                            >
                                <span className={`w-[22px] h-[22px] rounded-[7px] grid place-items-center shrink-0 font-['Bricolage_Grotesque',sans-serif] font-bold text-[10.5px] ${inputBg} ${text}`}>
                                    GH
                                </span>
                                GitHub
                            </button>
                        </div>

                        <p className={`text-center text-[13px] ${mutedText} mt-[22px]`}>
                            Don't have an account?{' '}
                            <Link href="/sign-up" className={`${text} underline underline-offset-[3px]`}>
                                Sign up
                            </Link>
                        </p>
                    </div>

                </section>
            </div>

            <div className={`fixed bottom-[26px] left-1/2 -translate-x-1/2 translate-y-[80px] ${markBg} ${markText} py-3 px-[22px] rounded-xl text-[13.5px] font-semibold opacity-0 transition-all duration-300 z-[99] max-w-[90vw] text-center`}>
            </div>
        </main>
    );
}