"use client";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./Notes.client.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { useDebounce } from "use-debounce";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { fetchNotes } from "@/lib/api/clientApi";
import type { FetchNotesParams, FetchNotesResponse } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";

type Props = {
  tag?: string;
};
const PER_PAGE = 12;

export default function NotesClient({ tag }: Props) {
  const [search, setSearch] = useState("");
  const [debouncedSearchQuery] = useDebounce(search, 500);
  const [page, setPage] = useState(1);

  const queryParams: FetchNotesParams = {
    page,
    search: debouncedSearchQuery,
    tag,
    perPage: PER_PAGE,
  };

  const { data, isPending, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", queryParams],
    queryFn: () => fetchNotes(queryParams),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  console.log(data);
  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data && totalPages > 1 && (
          <Pagination
            currentPage={page}
            pageCount={totalPages}
            onChangePage={setPage}
          />
        )}
        <Link href="/notes/action/create">
          <button className={css.button}>Create note +</button>
        </Link>
      </header>

      {isPending && <Loader />}
      {isError && <ErrorMessage />}
      {!isPending && !isError && notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
