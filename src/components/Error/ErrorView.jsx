import errorImage from './errorImage.png';
function ErrorView({ errorText }) {
  console.log(errorText);
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
      <p>{`we are sorry, ${errorText}  try again`}</p>
      <img src={errorImage} width="100%" alt="error" />
    </div>
  );
}

export default ErrorView;
