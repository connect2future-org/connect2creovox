const articles = [
  {
    title: "How Auto Branding Increases Visibility"
  },
  {
    title: "Static vs Dynamic Websites"
  },
  {
    title: "Why Every Business Needs CRM"
  },
  {
    title: "ERP Benefits For Growing Companies"
  },
  {
    title: "Digital Marketing Trends 2026"
  },
  {
    title: "Branding Strategies For Startups"
  }
];

const Insights = () => {

  return (
    <div className="pt-28 bg-white">

      <section className="py-20 text-center">

        <h1 className="text-6xl font-bold">

          Industry

          <span className="gradient-text">
            {" "}Insights
          </span>

        </h1>

        <p className="text-gray-600 mt-6">
          Learn from our latest articles and case studies.
        </p>

      </section>

      <section className="pb-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {articles.map((article,index)=>(
              <div
                key={index}
                className="service-card"
              >

                <span className="text-pink-500 font-semibold">
                  Blog Article
                </span>

                <h3 className="text-2xl font-bold mt-4">
                  {article.title}
                </h3>

              </div>
            ))}

          </div>

        </div>

      </section>

    </div>
  );
};

export default Insights;