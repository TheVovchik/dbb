import { Tag } from '@/types/Tag';
import { SingleFolder } from '@/components/SingleFolder';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Icon, Text } from '@chakra-ui/react';
import { v4 as uuid } from 'uuid';
import { SingleFile } from '@/components/SingleFile';
import { Folder } from '@/types/Folder';
import { File } from '@/types/File';
import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BsChevronRight } from 'react-icons/bs';
import { LeftMenuBar } from '@/components/LeftMenuBar';
import { ActionBar } from '@/components/ActionBar';
import { Dropbox } from 'dropbox';
import { getItemFromLS } from '@/localstorage/localstorage';

const Folder: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');
  const [datas, setDatas] = useState<(File | Folder)[]>([])
  const [thisPath, setThisPath] = useState('');
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  const getDatas = async (path: string) => {
    const dbx = new Dropbox({
      accessToken: token,
    });

    const result = await dbx.filesListFolder({
        path
      }).then(res => res.result)
        .catch(error => error);

    if (result.entries) {
      setDatas(result.entries);
    } else {
      setDatas([]);
    }
  };

  useEffect(() => {
    if (datas) {
      const foldersFromDropbox: Folder[] = [];
      const filesFromDropbox: File[] = [];

      datas.forEach((data: File | Folder) => {
        if (data['.tag'] as Tag === Tag.FILE) {
          filesFromDropbox.push(data as File);
          
          return;
        }

        foldersFromDropbox.push(data as Folder);
      })

      setFolders(foldersFromDropbox);
      setFiles(filesFromDropbox);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 3000)
  }, [datas])

  useEffect(() => {
    const slug = router.query || [];

    if (slug.folder && token) {
      setToken(slug.folder[0]);
      const path = slug.folder as string[];
      const currentPath = '/' + path.join('/');

      setThisPath(currentPath);
      getDatas(currentPath);
    };
  }, [router, token]);

  useEffect(() => {
    const token = getItemFromLS('token');

    setToken(token.replace('"', ''));
  }, []);

  return (
    <Flex w="100vw" h="100vh" >
      <LeftMenuBar />

      <Flex direction="column" p="40px" gap="20px" maxH="100vh" overflowY="auto" pos="relative">
        <ActionBar path={thisPath} token={token} />
        <Box minH="100px" w="100%" bg="white" />

        <Breadcrumb spacing='8px' separator={<Icon as={BsChevronRight} color='gray.500' />} >
          <BreadcrumbItem>
            <BreadcrumbLink href="/app" >Home</BreadcrumbLink>
          </BreadcrumbItem>
          {thisPath && thisPath.slice(1).split('/').map((path, idx, arr) => {
            const currentPath = idx !== 0 ? '/app/' + arr.slice(0, idx).join('/') + `/${path}` : `/app/${path}`;

            return (
              <BreadcrumbItem key={currentPath}>
                <BreadcrumbLink href={currentPath} >{path ? path : 'Home'}</BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>

        {datas.length !==0 && (<Flex direction="column" gap="10px" bg="white" p="20px" minW="400px">
          {folders.map((folder) => {
            return (
              <SingleFolder key={uuid()} folder={folder} path={`/app${thisPath}`} />
            );
          })}

          {files.map((file) => {
            return (
              <SingleFile key={uuid()} file={file} token={token} />
            );
          })}
        </Flex>)}
        
        {folders.length === 0 && files.length === 0 && !isLoading && <Text>{'<folder is empty>'}</Text>}

      </Flex>
      
    </Flex>
  )
}

export default Folder;
