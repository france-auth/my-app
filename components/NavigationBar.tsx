

import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  to: string; // Add a "to" prop for routing
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  isActive = false,
  to,
}) => (
  <Link href={to}>
    <Box
      borderRadius={"10px"}
      w={{ base: "72px", sm: "76px" }}
      height={"80px"}
      p={"6px 16px"}
      textAlign={"center"}
      gap={"8px"}
      alignItems={"center"}
      justifyContent={"center"}
      className={`flex flex-col ${
        isActive ? "text-[#f5f5f5] bg-[#1d222e]" : "text-[#4979d1] bg-[#1f2024]"
      }`}
    >
      {icon}
      <Text
        fontSize={{ base: "9px", sm: "10.67px" }}
        fontWeight={500}
        textAlign={"center"}
        lineHeight={"12.91px"}
        width={label === "Power Up" ? "35px" : ""}
      >
        {label}
      </Text>
    </Box>
  </Link>
);

const NavigationBar: React.FC = () => {
 const location = typeof window !== "undefined" ? window.location : null;
 const pathname = location?.pathname!!


  const isGameActive = pathname.startsWith("/games");
  const isTriviaActive = pathname.startsWith("/trivia");
  const isRouletteActive = pathname.startsWith("/roulette");
  const isJigsawActive = pathname.startsWith("/jigsaw");
  const isCommunityActive = pathname.startsWith("/communities");
  const isBadgeActive = pathname.startsWith("/badges");
  const isDailyActive = pathname.startsWith("/dailytask");
  const isSocialActive = pathname.startsWith("/socials");
  const isDailyRewardActive = pathname.startsWith("/daily");
  const isPuzzleActive = pathname.startsWith("/puzzle");
  return (
    <nav className="fixed bottom-0  bg-[#12161E] w-[100vw] z-40 p-[5px]">
      <div className="flex justify-center items-center w-[100%] gap-1">
        <NavItem
          icon={
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0001 15.1111C13.2894 15.6644 12.3558 16 11.3334 16C10.3109 16 9.37744 15.6644 8.66675 15.1111"
                stroke="currentColor"
                stroke-linecap="round"
              />
              <path
                d="M2.75693 11.7453C2.44313 9.70328 2.28623 8.68233 2.67229 7.77722C3.05833 6.8721 3.91483 6.25282 5.62782 5.01427L6.90768 4.08888C9.03862 2.54814 10.1041 1.77777 11.3335 1.77777C12.5628 1.77777 13.6283 2.54814 15.7593 4.08888L17.0391 5.01427C18.7522 6.25282 19.6086 6.8721 19.9946 7.77722C20.3807 8.68233 20.2238 9.70328 19.91 11.7453L19.6425 13.4866C19.1976 16.3812 18.9752 17.8286 17.937 18.6921C16.8989 19.5555 15.3811 19.5555 12.3458 19.5555H10.3212C7.28577 19.5555 5.76806 19.5555 4.72991 18.6921C3.69177 17.8286 3.46935 16.3812 3.02452 13.4866L2.75693 11.7453Z"
                stroke="currentColor"
                stroke-linejoin="round"
              />
            </svg>
          }
          isActive={
            isGameActive ||
            isTriviaActive ||
            isRouletteActive ||
            isJigsawActive ||
            pathname === "/"
          }
          label="Start The Rush"
          to="/"
        />
        <NavItem
          icon={
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.3951 18.3705V13.6297M16.7823 13.6297V12.4445M16.7823 19.5556V18.3705M15.3951 16.0001H18.1695M18.1695 16.0001C18.6292 16.0001 19.0019 16.398 19.0019 16.889V17.4816C19.0019 17.9725 18.6292 18.3705 18.1695 18.3705H14.5627M18.1695 16.0001C18.6292 16.0001 19.0019 15.6021 19.0019 15.1112V14.5186C19.0019 14.0276 18.6292 13.6297 18.1695 13.6297H14.5627"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.396 3.72102C12.1511 2.9463 8.95611 1.45923 6.0781 1.83879C7.81899 3.05657 8.73484 3.71156 11.2055 5.94583M16.8374 7.21654C17.1681 7.76461 17.7213 8.82567 18.1087 9.93058M14.647 9.44133C14.862 9.68649 15.1234 10.055 15.3106 10.2724M9.5377 9.2608L3.3685 15.5269C2.86808 16.0352 2.8756 16.8668 3.38528 17.3845C3.89497 17.9022 4.71381 17.9099 5.21423 17.4016L11.3835 11.1356M10.8625 7.31177L13.3021 9.78978C13.5731 10.0649 14.0113 10.066 14.281 9.792L17.3035 6.72204C17.5732 6.44813 17.5722 6.00303 17.3013 5.72787L14.8616 3.2499C14.5907 2.97475 14.1525 2.97373 13.8828 3.24764L10.8603 6.31761C10.5906 6.59151 10.5916 7.03661 10.8625 7.31177Z"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          label="Power Up"
          isActive={pathname === "/powerUps"}
          to="/powerUps"
        />
        <NavItem
          icon={
            <svg
              width="20"
              height="23"
              viewBox="0 0 20 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.599976 8.8592C0.599976 5.15467 0.599976 3.30187 1.69331 2.15093C2.78664 1 4.54664 1 8.06664 1H11.2666C14.7866 1 16.5466 1 17.64 2.152C18.7333 3.3008 18.7333 5.1536 18.7333 8.85813V14.4731C18.7333 18.1776 18.7333 20.0304 17.64 21.1813C16.5466 22.3323 14.7866 22.3333 11.2666 22.3333H8.06664C4.54664 22.3333 2.78664 22.3333 1.69331 21.1813C0.599976 20.0325 0.599976 18.1797 0.599976 14.4752V8.8592Z"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.40002 1L5.48749 1.52587C5.70082 2.80267 5.80749 3.4416 6.25549 3.82133C6.70136 4.2 7.34882 4.2 8.64376 4.2H10.6886C11.9824 4.2 12.6299 4.2 13.0779 3.82133C13.5259 3.4416 13.6326 2.80267 13.8448 1.52587L13.9334 1M5.40002 15.9333H9.66669M5.40002 10.6H13.9334"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          label="Daily Challenge"
          isActive={
            isDailyActive ||
            isDailyRewardActive ||
            isSocialActive ||
            isCommunityActive ||
            isPuzzleActive ||
            pathname === "/challenges"
          }
          to="/challenges"
        />

        <NavItem
          icon={
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_565_570)">
                <path
                  d="M17.0008 17.3342H16.8569C16.6872 16.5077 16.3883 15.7476 15.9603 15.0539C15.5323 14.3602 15.012 13.7625 14.3995 13.2606C13.787 12.7588 13.097 12.3677 12.3295 12.0873C11.5621 11.8069 10.7577 11.6667 9.91641 11.6667C9.26701 11.6667 8.63975 11.7515 8.03462 11.9213C7.4295 12.091 6.86496 12.3271 6.34102 12.6297C5.81707 12.9323 5.34109 13.3012 4.91307 13.7366C4.48506 14.172 4.11608 14.6517 3.80614 15.1756C3.4962 15.6996 3.25636 16.2641 3.08663 16.8693C2.9169 17.4744 2.83204 18.1016 2.83204 18.751H1.41516C1.41516 17.8655 1.5443 17.0132 1.80259 16.194C2.06087 15.3749 2.43354 14.6185 2.92059 13.9248C3.40764 13.2311 3.98325 12.6149 4.64741 12.0762C5.31157 11.5375 6.06428 11.1132 6.90555 10.8033C6.07166 10.2572 5.42226 9.57087 4.95735 8.74436C4.49244 7.91785 4.25629 7.00278 4.24891 5.99917C4.24891 5.21693 4.3965 4.48267 4.69168 3.79637C4.98687 3.11007 5.38905 2.50863 5.89824 1.99207C6.40743 1.4755 7.00887 1.06962 7.70254 0.774438C8.39622 0.479256 9.13418 0.331665 9.91641 0.331665C10.6986 0.331665 11.4329 0.479256 12.1192 0.774438C12.8055 1.06962 13.4069 1.47181 13.9235 1.981C14.4401 2.49019 14.846 3.09162 15.1411 3.7853C15.4363 4.47898 15.5839 5.21693 15.5839 5.99917C15.5839 6.48622 15.5249 6.9622 15.4068 7.42711C15.2887 7.89202 15.1116 8.33111 14.8755 8.74436C14.6393 9.15762 14.3626 9.53766 14.0453 9.8845C13.728 10.2313 13.3553 10.5376 12.9273 10.8033C13.7538 11.1206 14.5139 11.556 15.2076 12.1094C15.9012 12.6629 16.499 13.3123 17.0008 14.0576V17.3342ZM5.66579 5.99917C5.66579 6.58953 5.77648 7.13931 5.99787 7.6485C6.21925 8.15769 6.52181 8.60784 6.90555 8.99895C7.28929 9.39007 7.73944 9.69632 8.25601 9.91771C8.77258 10.1391 9.32605 10.2498 9.91641 10.2498C10.4994 10.2498 11.0492 10.1391 11.5657 9.91771C12.0823 9.69632 12.5325 9.39376 12.9162 9.01002C13.2999 8.62629 13.6062 8.17613 13.835 7.65957C14.0637 7.143 14.1744 6.58953 14.167 5.99917C14.167 5.41618 14.0563 4.8664 13.835 4.34983C13.6136 3.83327 13.311 3.38311 12.9273 2.99938C12.5435 2.61564 12.0897 2.30939 11.5657 2.08062C11.0418 1.85185 10.492 1.74116 9.91641 1.74854C9.32605 1.74854 8.77627 1.85923 8.26708 2.08062C7.75789 2.30201 7.30774 2.60457 6.91662 2.98831C6.5255 3.37204 6.21925 3.82589 5.99787 4.34983C5.77648 4.87378 5.66579 5.42356 5.66579 5.99917ZM19.8345 18.751H22.6683V20.1679H19.8345V23.0017H18.4177V20.1679H15.5839V18.751H18.4177V15.9173H19.8345V18.751Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_565_570">
                  <rect
                    width="22.67"
                    height="22.67"
                    fill="white"
                    transform="translate(-0.00170898 0.331665)"
                  />
                </clipPath>
              </defs>
            </svg>
          }
          label="Invite & earn"
          isActive={pathname === "/referral"}
          to="/referral"
        />
        <NavItem
          icon={
            <svg
              width="24"
              height="20"
              viewBox="0 0 24 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.73571 10.6667H5.62139C5.65523 10.6667 5.68494 10.6799 5.70469 10.6991C5.72396 10.7178 5.7321 10.7402 5.7321 10.7604V19.1666H0.625V10.7604C0.625 10.7402 0.633141 10.7178 0.652412 10.6991C0.672162 10.6799 0.701874 10.6667 0.73571 10.6667Z"
                stroke="currentColor"
              />
              <path
                d="M9.557 1.16672H14.4427C14.4765 1.16672 14.5062 1.17992 14.526 1.19912L14.8715 0.843744L14.526 1.19912C14.5453 1.21785 14.5534 1.24022 14.5534 1.26046V19.1666H9.44629V1.26046C9.44629 1.24022 9.45443 1.21785 9.4737 1.19912C9.49345 1.17992 9.52316 1.16672 9.557 1.16672Z"
                stroke="currentColor"
              />
              <path
                d="M18.3785 5.91669H23.2642C23.2981 5.91669 23.3278 5.92989 23.3475 5.94909L23.6961 5.59059L23.3475 5.94909C23.3668 5.96782 23.3749 5.99019 23.3749 6.01043V19.1666H18.2678V6.01043C18.2678 5.99019 18.276 5.96782 18.2952 5.94909C18.315 5.92989 18.3447 5.91669 18.3785 5.91669Z"
                stroke="currentColor"
              />
            </svg>
          }
          label="Leaderboard"
          isActive={isBadgeActive || pathname === "/achievement"}
          to="/achievement"
        />
      </div>
    </nav>
  );
};

export default NavigationBar;
