export const PageNotFound = () => {
  return (
    <div className="grids">
      <h1
        className="
          welcome-title 
          col-[1/5] 
          sm:col-[1/10] 
          xl:col-[1/18]
        "
      >Page Not Found</h1>

      <div
        className="
          col-[1/5] 
          mb-[64px] 
          mt-[24px]
          sm:col-[1/13]
          sm:mt-[32px]
          xl:col-[1/25]
          xl:mb-[80px]
          xl:mt-[56px]
        "
      >
        <img
          src="./img/page-not-found.png"
          alt="NotFoundPage"
          className="w-full"
        />
      </div>
    </div>
  );
};