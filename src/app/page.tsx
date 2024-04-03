"use client";
import { useState, useEffect } from "react";
import { Plus, RotateCcw, RotateCw } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

let initalTeams = [
  { id: 0, name: "Hansi", count: 0 },
  { id: 1, name: "Felix", count: 0 },
  { id: 2, name: "Nowak", count: 0 },
  { id: 3, name: "Ben", count: 0 },
];

let nextId = 0;

export default function Home() {
  const [counter, setCounter] = useState(0);
  const [name, setName] = useState("");
  const [team, setTeam] = useState<
    { id: number; name: string; count: number }[]
  >(JSON.parse(localStorage.getItem("team") || "[]"));

  const incrementCount = (id: number, incrementValue: number) => {
    setCounter((cnt) => cnt + incrementValue);
  };

  const handleSubmit = (id: number) => {
    setTeam((prevTeams) =>
      prevTeams.map((team) =>
        team.id === id ? { ...team, count: team.count + counter } : team
      )
    );
    setCounter(0);
    sortTeamsByCount();
  };

  const sortTeamsByCount = () => {
    setTeam((prevTeams) => [...prevTeams].sort((a, b) => b.count - a.count));
  };

  const getTeamIndex = () => {
    return team
      .map((team, index) => ({
        index: index + 1,
        team: team,
      }))
      .sort((a, b) => b.team.count - a.team.count);
  };

  const getMedalEmoji = (index: number, count: number) => {
    if (index === 0 && count > 0) {
      return <span>&#127942;</span>;
    }
  };

  useEffect(() => {
    console.log(getTeamIndex());
  });

  useEffect(() => {
    localStorage.setItem("team", JSON.stringify(team));
  }, [team]);

  return (
    <main>
      <Tabs defaultValue="list" className="w-max-md">
        <TabsList>
          <TabsTrigger value="list">Liste</TabsTrigger>
          <TabsTrigger value="graphic">Verlauf</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Team</TableHead>
                <TableHead className="text-right">Menge</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getTeamIndex().map((teamData, index) => (
                <TableRow key={teamData.team.id}>
                  <TableCell className="w-[100px]">
                    <Drawer>
                      <DrawerTrigger>
                        {getMedalEmoji(index, teamData.team.count)}
                        {teamData.team.name}
                      </DrawerTrigger>
                      <DrawerContent>
                        <div className="mx-auto w-full max-w-sm">
                          <DrawerHeader>
                            <DrawerTitle>
                              {`Team ` + teamData.team.name + ` löschen`}
                            </DrawerTitle>
                            <DrawerDescription>
                              Willst du wirklich dieses Team löschen?
                            </DrawerDescription>
                          </DrawerHeader>
                          <DrawerFooter>
                            <DrawerClose className="grid gap-2">
                              <Button
                                variant="destructive"
                                onClick={() => {
                                  setTeam(
                                    team.filter(
                                      (team) => team.id !== teamData.team.id
                                    )
                                  );
                                }}
                              >
                                Löschen
                              </Button>
                              <Button>Abbruch</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </TableCell>
                  <TableCell className="text-right">
                    <Drawer>
                      <DrawerTrigger>{teamData.team.count}</DrawerTrigger>
                      <DrawerContent>
                        <div className="mx-auto w-full max-w-sm">
                          <DrawerHeader>
                            <DrawerTitle>Spritzer🍇</DrawerTitle>
                            <DrawerDescription>
                              Anzahl an verkauften Spritzer eintragen...
                            </DrawerDescription>
                          </DrawerHeader>
                          <div className="flex-1 text-center">
                            <div className="text-7xl font-bold tracking-tighter">
                              {counter}
                            </div>
                            <div className="text-[0.70rem] uppercase text-muted-foreground">
                              Spritzer
                            </div>
                          </div>
                          <div className="p-4 flex justify-between">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10 shrink-0 rounded-full"
                              onClick={() =>
                                incrementCount(teamData.team.id, 1)
                              }
                            >
                              +1
                            </Button>

                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10 shrink-0 rounded-full"
                              onClick={() =>
                                incrementCount(teamData.team.id, 2)
                              }
                            >
                              +2
                            </Button>

                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10 shrink-0 rounded-full"
                              onClick={() =>
                                incrementCount(teamData.team.id, 10)
                              }
                            >
                              +10
                            </Button>

                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10 shrink-0 rounded-full"
                              onClick={() => setCounter(0)}
                            >
                              <RotateCcw className="h-5 w-5" />
                            </Button>
                          </div>
                          <DrawerFooter>
                            <DrawerClose asChild>
                              <Button
                                onClick={() => handleSubmit(teamData.team.id)}
                              >
                                Submit
                              </Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="graphic"></TabsContent>
      </Tabs>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="secondary" className="mt-5">
            <Plus className="mr-2 h-4 w-4" /> Neues Team
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Neues Team erstellen</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="grid w-full max-w items-center gap-1.5">
                <Label htmlFor="name">Team</Label>
                <Input onChange={(e) => setName(e.target.value)} />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbruch</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setTeam([
                  ...team,
                  { id: nextId++, name: name, count: counter },
                ]);
              }}
            >
              Speichern
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 shrink-0 rounded-full ml-2"
        onClick={() => window.location.reload()}
      >
        <RotateCw className="h-5 w-5" />
      </Button>
      
    </main>
  );
}
