"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { setTimeout } from "timers";
import { AuthUser, fetchUserAttributes } from "aws-amplify/auth";

interface HeaderPrimaryProps {
  toggleIsSigningOut: any;
  user: AuthUser | undefined;
};

const HeaderPrimary: React.FC<HeaderPrimaryProps> = (props): React.ReactElement => {
  const router = useRouter();

  const [state, setState] = useState<string>('');

  const onClickHandler = async (): Promise<void> => {
    try {
      props.toggleIsSigningOut();
      setTimeout(async () => {
        localStorage.clear(); 
        router.push('/');
        props.toggleIsSigningOut();
      }, 3000);
    } catch (error) {
      console.log('error signing out: ', error);
      props.toggleIsSigningOut();
    };
  };

  const onMount = async (): Promise<void> => {
    try {
      const currentUser = await fetchUserAttributes();
      const friendlyUsername: string = currentUser['custom:friendly_username'] ? currentUser['custom:friendly_username'] : '';

      setState(friendlyUsername);
    } catch (error ) {
      console.log('error signing out: ', error);
      props.toggleIsSigningOut();
    };
  };

  useEffect(() => {
    if ( !state ) onMount();
  }, []);

  return (
    <div className='header-primary-container'>
      <div className='inner-container'>
        <div className='container-h'>
          <div className='column'>
            <span>User: { props.user ? props.user.signInDetails?.loginId : "" }</span>
          </div>
          <div className='column'>
            <button onClick={onClickHandler}>Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPrimary;