[00:03:08.897] Running build in Washington, D.C., USA (East) – iad1
[00:03:08.998] Cloning github.com/MYousuf-Codes/comforty-furnitures (Branch: main, Commit: 4e5b5a2)
[00:03:09.030] Skipping build cache, deployment was triggered without cache.
[00:03:11.994] Cloning completed: 2.996s
[00:03:12.352] Running "vercel build"
[00:03:12.775] Vercel CLI 40.1.0
[00:03:13.217] Installing dependencies...
[00:03:19.036] npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
[00:03:20.965] npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
[00:03:23.386] npm warn deprecated emailjs-com@3.2.0: The SDK name changed to @emailjs/browser
[00:03:24.336] npm warn deprecated @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead
[00:03:24.431] npm warn deprecated @humanwhocodes/config-array@0.13.0: Use @eslint/config-array instead
[00:03:26.224] npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
[00:03:32.610] npm warn deprecated eslint@8.57.1: This version is no longer supported. Please see https://eslint.org/version-support for other options.
[00:03:55.496] 
[00:03:55.496] added 1540 packages in 42s
[00:03:55.496] 
[00:03:55.496] 296 packages are looking for funding
[00:03:55.497]   run `npm fund` for details
[00:03:55.679] Detected Next.js version: 15.1.6
[00:03:55.694] Running "npm run build"
[00:03:55.941] 
[00:03:55.941] > comforty-marketplace@0.1.0 build
[00:03:55.942] > next build
[00:03:55.942] 
[00:03:57.399] Attention: Next.js now collects completely anonymous telemetry regarding usage.
[00:03:57.399] This information is used to shape Next.js' roadmap and prioritize features.
[00:03:57.399] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
[00:03:57.399] https://nextjs.org/telemetry
[00:03:57.399] 
[00:03:57.520]    ▲ Next.js 15.1.6
[00:03:57.522] 
[00:03:57.669]    Creating an optimized production build ...
[00:04:00.204] (node:328) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
[00:04:00.204] (Use `node --trace-deprecation ...` to show where the warning was created)
[00:05:09.539]  ✓ Compiled successfully
[00:05:09.549]    Linting and checking validity of types ...
[00:05:13.860] 
[00:05:13.862] ./src/app/api/subscribe.ts
[00:05:13.862] 6:1  Warning: Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-export
[00:05:13.862] 
[00:05:13.862] info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[00:05:24.595] Failed to compile.
[00:05:24.596] 
[00:05:24.596] ./src/components/CheckoutForm.tsx:72:41
[00:05:24.596] Type error: Argument of type '(data: z.infer<typeof formSchema>) => Promise<void>' is not assignable to parameter of type 'SubmitHandler<{ name: string; phone: string; deliveryAddress: string; paymentAddress: string; sameAsDelivery: boolean; paymentMethod: string; }>'.
[00:05:24.596]   Types of parameters 'data' and 'data' are incompatible.
[00:05:24.597]     Type '{ name: string; phone: string; deliveryAddress: string; paymentAddress: string; sameAsDelivery: boolean; paymentMethod: string; }' is not assignable to type '{ name: string; phone: string; deliveryAddress: string; paymentMethod: "stripe" | "cod"; paymentAddress?: string | undefined; sameAsDelivery?: boolean | undefined; }'.
[00:05:24.597]       Types of property 'paymentMethod' are incompatible.
[00:05:24.597]         Type 'string' is not assignable to type '"stripe" | "cod"'.
[00:05:24.597] 
[00:05:24.597] [0m [90m 70 |[39m   [36mreturn[39m ([0m
[00:05:24.597] [0m [90m 71 |[39m     [33m<[39m[33mForm[39m {[33m...[39mform}[33m>[39m[0m
[00:05:24.597] [0m[31m[1m>[22m[39m[90m 72 |[39m       [33m<[39m[33mform[39m onSubmit[33m=[39m{form[33m.[39mhandleSubmit(onSubmit)} className[33m=[39m[32m"space-y-4"[39m[33m>[39m[0m
[00:05:24.597] [0m [90m    |[39m                                         [31m[1m^[22m[39m[0m
[00:05:24.597] [0m [90m 73 |[39m         [33m<[39m[33mFormField[39m control[33m=[39m{form[33m.[39mcontrol} name[33m=[39m[32m"name"[39m render[33m=[39m{({ field }) [33m=>[39m ([0m
[00:05:24.597] [0m [90m 74 |[39m           [33m<[39m[33mFormItem[39m[33m>[39m[0m
[00:05:24.597] [0m [90m 75 |[39m             [33m<[39m[33mFormControl[39m[33m>[39m[0m
[00:05:24.648] Static worker exited with code: 1 and signal: null
[00:05:24.755] Error: Command "npm run build" exited with 1
[00:05:27.319] 