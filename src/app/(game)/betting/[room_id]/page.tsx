// export default async function RoomDetailPage({
// 	params,
// }: {
// 	params: Promise<{ room_id: string }>;
// 	// searchParams가 필요하면 아래처럼 추가
// 	// searchParams: { foo?: string };
// }) {
// 	const { room_id } = await params;

// 	const res = await fetch(
// 		`http://localhost:3000/betting/${room_id}`
// 	);
// 	const = await res.json();

// 	return (
// 		<div className="container mx-auto text-center p-8">
// 			<h1 className="text-3xl font-bold underline">게시글 상세 페이지</h1>
// 			<p className="mt-4 text-lg">여기는 게시글 상세 페이지입니다.</p>
// 			<ClientGetAlbums albumsId={albumsId} />
// 		</div>
// 	);
// }
