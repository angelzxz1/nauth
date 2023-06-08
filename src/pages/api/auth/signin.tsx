import { signIn, getCsrfToken, getProviders } from 'next-auth/react'


type SigninProps = {
  csrfToken: string
  providers: {
    [key: string]: {
      id: string
      name: string
      type: string
      signinUrl: string
      callbackUrl: string
    }
  }
}
const Signin = ({ csrfToken, providers }:SigninProps) => {
  if(csrfToken && providers){
    return (
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div className='' />
        <div className=''>
          <div className=''>
            <div className='first-letter:'>
              
              <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
              <button className=''>
                Submit
              </button>
              <hr />
              {providers &&
                Object.values(providers).map(provider => (
                  <div key={provider.name} style={{ marginBottom: 0 }}>
                    <button onClick={() => void signIn(provider.id)} >
                      Sign in with{' '} {provider.name}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    )
  }else{
    return(
      <div>
        <h1>Something Went Wrong</h1>
      </div>
    )
  }
  
}

export default Signin

type getServerSidePropsType = {
  req: {
    headers: {
      host: string
    }
  }
}
export async function getServerSideProps(context:getServerSidePropsType) {
  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)
  return {
    props: {
      providers,
      csrfToken
    },
  }
}