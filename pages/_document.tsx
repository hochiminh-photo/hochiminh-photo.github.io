import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <meta
            name="description"
            content="Chủ tịch Hồ Chí Minh - Tấm gương rạng ngời dân tộc, sự kết hợp giữa khôn khéo chiến lược và đạo đức bền vững qua nhiều thập kỷ thử thách là minh chứng cho tài năng mọi thời đại."
          />
          <meta property="og:site_name" content="nextjsconf-pics.vercel.app" />
          <meta
            property="og:description"
            content="Chủ tịch Hồ Chí Minh - Tấm gương rạng ngời dân tộc, sự kết hợp giữa khôn khéo chiến lược và đạo đức bền vững qua nhiều thập kỷ thử thách là minh chứng cho tài năng mọi thời đại."
          />
          <meta property="og:title" content="Chủ tịch Hồ Chí Minh - Tấm gương rạng ngời dân tộc, sự kết hợp giữa khôn khéo chiến lược và đạo đức bền vững qua nhiều thập kỷ thử thách là minh chứng cho tài năng mọi thời đại." />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Chủ tịch Hồ Chí Minh - Tấm gương rạng ngời dân tộc, sự kết hợp giữa khôn khéo chiến lược và đạo đức bền vững qua nhiều thập kỷ thử thách là minh chứng cho tài năng mọi thời đại." />
          <meta
            name="twitter:description"
            content="Chủ tịch Hồ Chí Minh - Tấm gương rạng ngời dân tộc, sự kết hợp giữa khôn khéo chiến lược và đạo đức bền vững qua nhiều thập kỷ thử thách là minh chứng cho tài năng mọi thời đại."
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
