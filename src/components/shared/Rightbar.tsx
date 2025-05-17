export default function Rightbar() {
  return (
    <aside className="hidden lg:block w-[350px] min-h-screen border-l bg-background p-4 fixed right-0 top-0 overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600">E</span>
        </div>
        <div>
          <p className="font-medium">test</p>
          <p className="text-sm text-muted-foreground">Test</p>
        </div>
        <button className="ml-auto text-blue-500 text-sm font-medium">
          Geçiş Yap
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm text-gray-500 font-medium">
          Senin için öneriler
        </h3>
        <button className="text-sm font-medium">Tümünü Gör</button>
      </div>

      {/* Recommendations */}
      <div className="space-y-3">
        {[
          { username: "asdasd", info: "asdasd takip ediyor", verified: true },
          { username: "asdasd", info: "asdasd + 1 diğer kişi takip ediyor" },
          { username: "asdasd", info: "asdasd + 11 diğer kişi takip ediyor" },
          { username: "asdasd", info: "asdasd + 3 diğer kişi takip ediyor" },
          { username: "asdasd", info: "asdasd + 8 diğer kişi takip ediyor" },
        ].map((profile, index) => (
          <div key={index} className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
            <div className="ml-3 flex-1">
              <div className="flex items-center">
                <p className="text-sm font-medium">{profile.username}</p>
                {profile.verified && (
                  <span className="ml-1 text-blue-500">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {profile.info}
              </p>
            </div>
            <button className="text-blue-500 text-sm font-medium">
              Takip Et
            </button>
          </div>
        ))}
      </div>

      {/* Footer Links */}
      <div className="mt-8">
        <div className="flex flex-wrap text-xs text-muted-foreground gap-x-1 gap-y-0.5">
          <a href="#" className="hover:underline">
            Hakkında
          </a>{" "}
          ·
          <a href="#" className="hover:underline">
            Yardım
          </a>{" "}
          ·
          <a href="#" className="hover:underline">
            Basın
          </a>{" "}
          ·
          <a href="#" className="hover:underline">
            API
          </a>{" "}
          ·
          <a href="#" className="hover:underline">
            İş Fırsatları
          </a>{" "}
          ·
          <a href="#" className="hover:underline">
            Gizlilik
          </a>{" "}
          ·
          <a href="#" className="hover:underline">
            Koşullar
          </a>{" "}
          ·
          <a href="#" className="hover:underline">
            Konumlar
          </a>{" "}
          ·
          <a href="#" className="hover:underline">
            Dil
          </a>{" "}
          ·
        </div>
        <p className="text-xs text-muted-foreground mt-4">© 2025 MYMEDIA</p>
      </div>
    </aside>
  );
}
