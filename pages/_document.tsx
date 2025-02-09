import { Html, Head, Main, NextScript } from "next/document";
import Document, { DocumentContext, DocumentInitialProps } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,700italic,400,600,700"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Oswald:400,300,700"
          />
          <link rel="stylesheet" href="/css/jquery-ui-1.9.2.custom.min.css" />
          <link rel="stylesheet" href="/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/css/target-admin.css" />
          <title>Pickup Booking</title>
          <script src="/js/jquery-1.10.1.min.js"></script>
          <script src="/js/jquery-ui-1.9.2.custom.min.js"></script>
          <script src="/js/bootstrap.min.js"></script>
          <script src="/js/admin.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
