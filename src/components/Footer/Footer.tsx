import { ProjectMetadataFooter } from "@/util/types";

export function Footer() {
  return (
    <footer className="tw-bg-gray-800 tw-text-white tw-text-center tw-py-2 tw-absolute tw-bottom-0 tw-right-0 tw-left-0 tw-ml-auto tw-mr-auto tw-w-full tw-items-center">
      <div className="tw-ml-auto tw-mr-auto tw-flex tw-justify-around tw-p-2 tw-m-1 tw-w-3/6 tw-font-semibold tw-gap-2 tw-min-w-fit">
        {Object.values(ProjectMetadataFooter).map((setting) => {
          return (
            <div key={setting} className="tw-text-xs tw-py-5 tw-w-14">
              <div className="clickable-basic">{setting}</div>
            </div>
          );
        })}
      </div>
    </footer>
  );
}
