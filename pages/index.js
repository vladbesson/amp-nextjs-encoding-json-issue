import Layout from '../components/Layout'

export const config = { amp: true }

const Home = (props) => (
  <>
    <Layout
      title="Welcome to AMP"
      description="Learn how to build an AMP First with Next.js."
    >
      <main>
        <h1>Test</h1>
        <amp-analytics id='analytics1' type='googleanalytics'>
          <script type='application/json' dangerouslySetInnerHTML={{ __html: `
            {
              "vars": {
                "account": "XX-XXXXXXXX-X"
              },
              "requests": {
                "experiment": "\${pageview}&xid=\${xid}&xvar=\${xvar}"
              }
            }
          ` }} />
        </amp-analytics>
      </main>
    </Layout>
  </>
)

// amp-script requires absolute URLs, so we create a property `host` which we can use to calculate the script URL.
export async function getServerSideProps({ req }) {
  // WARNING: This is a generally unsafe application unless you're deploying to a managed platform like Vercel.
  // Be sure your load balancer is configured to not allow spoofed host headers.
  return { props: { host: `${getProtocol(req)}://${req.headers.host}` } }
}

function getProtocol(req) {
  if (req.connection.encrypted) {
    return 'https'
  }
  const forwardedProto = req.headers['x-forwarded-proto']
  if (forwardedProto) {
    return forwardedProto.split(/\s*,\s*/)[0]
  }
  return 'http'
}

export default Home
