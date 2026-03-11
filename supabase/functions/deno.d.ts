// Deno type definitions for Edge Functions
declare const Deno: {
  serve(handler: (req: Request) => Response | Promise<Response>): void;
  env: {
    get(key: string): string | undefined;
  };
};

declare const btoa: (str: string) => string;
