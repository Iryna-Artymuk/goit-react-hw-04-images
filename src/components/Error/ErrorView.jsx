import errorImage from './errorImage.png';
function ErrorView({ text }) {
  console.log(text);
  return (
    <div
      style={{
        width: '50wv',
        heidht: '50wv',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        padding: 20,

        margin: 'auto',
        fontSize: 24,
      }}
    >
      <p>{`We are sorry, something went wrong try again`}</p>
      <img src={errorImage} width="100%" alt="error" />
    </div>
  );
}

export default ErrorView;
