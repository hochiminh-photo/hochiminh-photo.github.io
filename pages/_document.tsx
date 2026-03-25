import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="See pictures from Next.js Conf and the After Party."
          />
          <meta property="og:site_name" content="nextjsconf-pics.vercel.app" />
          <meta
            property="og:description"
            content="See pictures from Next.js Conf and the After Party."
          />
          <meta property="og:title" content="Next.js Conf 2022 Pictures" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Next.js Conf 2022 Pictures" />
          <meta
            name="twitter:description"
            content="See pictures from Next.js Conf and the After Party."
          />
        </Head>
        <body className="bg-black antialiased" suppressHydrationWarning>
          <script
            dangerouslySetInnerHTML={{
              __html: `(() => {
  const attr = "bis_skin_checked";
  const selector = "[" + attr + "]";

  const scrub = (root) => {
    if (!root || !root.querySelectorAll) return;
    if (root.hasAttribute && root.hasAttribute(attr)) {
      root.removeAttribute(attr);
    }
    root.querySelectorAll(selector).forEach((el) => el.removeAttribute(attr));
  };

  scrub(document.documentElement);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.attributeName === attr) {
        mutation.target.removeAttribute(attr);
      }
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            scrub(node);
          }
        });
      }
    }
  });

  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: [attr],
  });

  window.addEventListener("load", () => {
    setTimeout(() => observer.disconnect(), 3000);
  });
})();`,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
