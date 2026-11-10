export function MindDiagram() {
  const branches = [
    "M245 76C210 47 164 66 157 105C108 99 83 131 89 163C52 184 54 226 74 247C47 286 74 328 108 331C115 373 154 391 187 379C200 415 236 413 245 391",
    "M245 89C215 85 193 111 202 136C171 131 145 147 147 175C114 167 95 193 108 219C84 229 92 263 116 265C101 296 130 321 155 310C151 342 180 363 204 351C200 373 217 389 245 384",
    "M245 150C219 138 203 159 213 181C178 175 164 204 179 227C146 220 131 245 148 266C170 275 191 257 188 242",
    "M245 211C211 202 197 225 208 247C232 257 232 275 214 293C187 308 194 332 218 335L245 320",
    "M157 105C180 108 181 129 168 148",
    "M89 163C118 158 131 145 123 126",
    "M74 247C90 232 108 238 116 265",
    "M108 331C127 336 139 351 132 365",
    "M147 175C166 176 175 159 166 148",
    "M155 310C168 294 160 278 148 266",
    "M202 136C225 139 235 128 231 109",
    "M204 351C211 348 220 351 223 368",
  ];
  const circuits = [
    "M266 89H304L324 109H354V143H388",
    "M266 126H288V164H333L354 185H404",
    "M266 170H298V204H373V230H416",
    "M266 210H285V250H335L358 273H404",
    "M266 270H296V294H327V327H387",
    "M266 320H291V351H348V377",
    "M266 370H285V392H313",
    "M304 89V64H329",
    "M354 143V115H384",
    "M333 164V136H319",
    "M373 204V172H400",
    "M335 250V223H350",
    "M327 294H367V309H410",
    "M291 351H313V371",
    "M388 143H409V165H427",
  ];
  return (
    <div className="mind-graphic">
      <div className="diagram-caption">
        <span>FIG. 01 / SISTEMA COGNITIVO</span>
        <span>UMANO ↔ ARTIFICIALE</span>
      </div>
      <svg viewBox="0 0 500 460" fill="none" aria-label="Cervello organico e circuiti digitali">
        <title>Cervello organico e circuiti digitali</title>
        <defs>
          <radialGradient id="halo">
            <stop stopColor="#b4d96a" stopOpacity=".13" />
            <stop offset="1" stopColor="#b4d96a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="250" cy="240" r="217" fill="url(#halo)" />
        {[160, 195, 224].map((r) => (
          <circle
            key={r}
            cx="250"
            cy="238"
            r={r}
            stroke="#a4b59d"
            strokeOpacity=".12"
            strokeDasharray={r === 195 ? "3 8" : undefined}
          />
        ))}
        <path
          d="M250 24V430M26 238H477"
          stroke="#65716a"
          strokeOpacity=".25"
          strokeDasharray="3 6"
        />
        {branches.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="#d5f86f"
            strokeWidth={i === 0 ? 2.2 : 1.4}
            strokeLinecap="round"
          />
        ))}
        <path d="M245 76V391" stroke="#d5f86f" strokeWidth="1.4" />
        {circuits.map((d, i) => (
          <path key={i} d={d} stroke="#8faaa6" strokeWidth="1.5" />
        ))}
        {[
          [388, 143],
          [404, 185],
          [416, 230],
          [404, 273],
          [387, 327],
          [348, 377],
          [313, 392],
          [329, 64],
          [384, 115],
          [319, 136],
          [400, 172],
          [350, 223],
          [410, 309],
          [313, 371],
          [427, 165],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill="#192329" stroke="#b6d4cd" strokeWidth="1.3" />
        ))}
        {[
          [157, 105],
          [89, 163],
          [74, 247],
          [108, 331],
          [202, 136],
          [147, 175],
          [155, 310],
          [204, 351],
          [179, 227],
          [245, 211],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#d5f86f" />
        ))}
        <path d="M48 62H68M58 52V72M438 401H458M448 391V411" stroke="#819087" />
        <text x="40" y="436" fill="#a3b09f" fontSize="9" fontFamily="monospace">
          MEMORIA · ESPERIENZA · GIUDIZIO
        </text>
        <text x="313" y="436" fill="#a3b09f" fontSize="9" fontFamily="monospace">
          DATI · CALCOLO · OUTPUT
        </text>
      </svg>
      <div className="diagram-bottom">
        <span>
          <i /> IL PENSIERO NON È SOLO CALCOLO
        </span>
        <span>01 — 06</span>
      </div>
    </div>
  );
}
