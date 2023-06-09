export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const post = await res.json();
  return {
    props: {
      post
    }
  };
}
const Support = ({ post }: { post: any }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-200">
        Support
      </h1>
      <p className="mb-6 ml-2 text-lg font-normal text-gray-500 lg:text-xl">
        This is the universal template which could fit for almost your purposes.
      </p>
      {JSON.stringify(post)}
    </div>
  );
};

export default Support;
