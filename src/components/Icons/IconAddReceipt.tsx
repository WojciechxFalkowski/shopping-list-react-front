const IconAddReceipt = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M154 336V48L184.5 64L215 48L245.443 64L276.295 48L306.5 64L336.8 48L367.233 64L398 48L428.51 64L459 48V272"
        stroke="black"
        strokeWidth={20}
      />
      <path
        d="M459 272V384C459 405.217 450.967 425.566 436.667 440.569C422.367 455.571 402.973 464 382.75 464M382.75 464C362.527 464 343.133 455.571 328.833 440.569C314.534 425.566 306.5 405.217 306.5 384V336H47.2506C45.243 335.981 43.2519 336.382 41.3937 337.18C39.5354 337.977 37.8472 339.155 36.4275 340.645C35.0079 342.134 33.8852 343.905 33.1252 345.855C32.3651 347.805 31.9828 349.894 32.0006 352C32.0006 416 38.4246 464 108.25 464H382.75Z"
        stroke="black"
        strokeWidth={20}
      />
      <path d="M224 144H416M288 224H416" stroke="black" strokeWidth={20} />
      <circle cx="387" cy="381" r="100" className="fill-black" />
      <line
        x1="389"
        y1="286"
        x2="389"
        y2="486"
        stroke="white"
        strokeWidth={32}
      />
      <line
        x1="287"
        y1="384"
        x2="487"
        y2="384"
        stroke="white"
        strokeWidth={32}
      />
    </svg>
  );
};
export default IconAddReceipt;
