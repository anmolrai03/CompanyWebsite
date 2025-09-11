
function Hero() {
  return (
    <main className="h-screen w-full overflow-hidden">
      
      <div className="pt-28 px-4">
        <p className="text-white leading-relaxed mb-8">
          Exclusive, designed and personalized sustainable fashion in France
          for those who prioritize quality and authenticity rather than mass
          production.
        </p>

        <p className="text-gray-400 mb-12">
          Exclusive, designed and personalized sustainable fashion in France
          for those who prioritize quality and authenticity rather than mass
          production.
        </p>

        <section className="flex items-center justify-center min-h-[50vh]">
          <p className="text-white text-2xl sm:text-3xl leading-relaxed text-center max-w-3xl mx-auto">
            Exclusive, designed and personalized sustainable fashion <br />
            in France for those who prioritize quality{" "}
            <span className="inline-block">🇫🇷</span> <br />
            and authenticity rather than mass production.
          </p>
        </section>
      </div>
    </main>
  );
}

// Export the tester for development, Hero for production
// export default LoadingTester;
export default Hero;