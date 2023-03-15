import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import loadingGIF from "../../img/loading.gif";

const Loading = ({path='login'}) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location,'kkkllllll');

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    //redirect once count ==0
    count === 0 && navigate(`/${path}`,{
      state:location.pathname
    });

    //cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <img src={loadingGIF} alt="loading..." style={{width:'400px'}} />
    </div>
  );
};

export default Loading;
