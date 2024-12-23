import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";
import { EllipsisIcon, PlusIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import routes from "@/constants/routes";
import contactsIllustration from "@/assets/contacts-illustration.svg";

function Search() {
  const intl = useIntl();
  const searchFieldRef = useRef<HTMLInputElement>(null);

  const focusSearchField = () => {
    searchFieldRef.current?.focus();
  };

  return (
    <div
      onClick={focusSearchField}
      className="flex items-center gap-2 h-[46px] py-[14px] px-4 border-[1px] border-divider-75 rounded-[8px]"
    >
      <SearchIcon className="w-4 h-4 text-text-300" />

      <input
        ref={searchFieldRef}
        type="text"
        placeholder={intl.formatMessage({
          id: "Search for contacts...",
          defaultMessage: "Search for contacts...",
          description: "Placeholder text for search input",
        })}
        className="w-full bg-transparent text-text-300 text-sm font-medium placeholder-text-300 focus:outline-none"
      />
    </div>
  );
}

function Header() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-text-300 text-xl font-medium">
          <FormattedMessage
            id="Contacts"
            defaultMessage="Contacts"
            description="Title for contacts page"
          />
        </h1>

        <Button
          className="gap-1 p-0 h-fit text-text-300 text-xs font-medium no-underline hover:no-underline leading-[18px]"
          variant="link"
          onClick={() => { navigate(routes.CREATE_CONTACT); }}
        >
          <PlusIcon className="w-4 h-4 text-text-300" />
          <FormattedMessage
            id="New contact"
            defaultMessage="New contact"
            description="Create contact button"
          />
        </Button>
      </div>

      <Search />
    </div>
  );
}

function Contact() {
  return (
    <div className="flex justify-between items-center bg-elevation-200 py-4 px-5 rounded-[12px] select-none">
      <div className="flex gap-3">
        <div className="flex justify-center items-center bg-brand-100 h-9 w-9 rounded-full">
          <span className="text-brand-200 text-xs font-medium">PH</span>
        </div>

        <div className="flex flex-col">
          <span className="text-text-300 text-base font-medium leading-6">
            Phoenix Baker
          </span>
          <span className="text-text-200 text-xs leading-[18px]">Catelog</span>
        </div>
      </div>

      <Button
        className="gap-1 p-0 h-fit text-text-300 text-xs font-medium no-underline hover:no-underline leading-[18px]"
        variant="link"
      >
        <EllipsisIcon className="w-6 h-6 text-text-300" />
      </Button>
    </div>
  );
}

function ContactsList() {
  return (
    <div className="flex-1 flex flex-col gap-2 w-full">
      <Contact />
      <Contact />
      <Contact />
      <Contact />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function EmptyList() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center w-52">
      <img src={contactsIllustration} className="w-18 h-18 mx-auto mb-5" />

      <div className="flex flex-col items-center gap-2 text-center mb-4">
        <h2 className="text-text-300 text-xl font-medium leading-[30px]">
          <FormattedMessage
            id="No contacts yet"
            defaultMessage="No contacts yet"
            description="Title for empty contacts list"
          />
        </h2>

        <span className="text-text-200 text-md leading-6">
          <FormattedMessage
            id="Create your first contact to start a relation"
            defaultMessage="Create your first contact to start a relation"
            description="Description for empty contacts list"
          />
        </span>
      </div>

      <Button
        className="w-fit text-text-300 bg-transparent text-sm font-medium border-text-300 rounded-[8px] py-3 px-6 hover:bg-transparent"
        variant="outline"
      >
        <FormattedMessage
          id="Create contact"
          defaultMessage="Create contact"
          description="Create contact button"
        />
      </Button>
    </div>
  );
}

export default function Overview() {
  return (
    <div className="flex flex-col justify-between items-center gap-6 w-full min-h-fit h-screen py-4 px-5">
      <Header />
      <ContactsList />
    </div>
  );
}
