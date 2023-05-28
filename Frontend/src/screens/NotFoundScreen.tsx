import React from 'react';

export const NotFoundScreen: React.FC = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <div></div>
          <h1>404</h1>
        </div>
        <h2>Pagina nu a fost gasita</h2>
        <p className="my-5">Pagina pe care ati incercat sa o accesati nu a fost gasita sau este temporar indisponibila.</p>
      </div>
    </div>
  );
};
