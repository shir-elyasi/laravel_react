<?php

namespace App\Http\Controllers;

use App\Models\Note;
// use Illuminate\Http\Request;
use App\Http\Requests\StoreNoteRequest;


class NotesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Note::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\StoreNoteRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreNoteRequest $request)
    {
        // $request->validate([
        //     'title' => ['required', 'max:255'],
        //     'body' => ['max:1000']

        // ]);
        $validated = $request->validated();

        return Note::create($request -> all());
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Note::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\StoreNoteRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreNoteRequest $request, $id)
    {
        $validated = $request->validated();

        $note = Note::find($id);
        $note->update($request->all());
        return $note;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = Note::where('id', $id) -> delete();
        if ($result) {
            return ['message' => "note has been deleted"];
        }
        else {
            return response()->json(['message' => 'Note not found'], 404);

        }

    }
}
