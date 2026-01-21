'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatDistanceToNow } from 'date-fns'
import { Mail, MessageSquare, RefreshCw, Shield, TrendingUp, User, Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

interface UserData {
  authUsers: any[]
  subscribers: any[]
  recentActivity: any[]
  stats: {
    totalAuthUsers: number
    totalSubscribers: number
    activeSubscribers: number
    recentComments: number
  }
}

export default function LogsPage() {
  const [data, setData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { data: session, status } = useSession()
  const router = useRouter()

  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/admin/users')

      if (response.status === 401) {
        setError('Please sign in to access this page')
        return
      }

      if (response.status === 403) {
        setError('Access Denied - Admin privileges required')
        return
      }

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to fetch data')
      }

      const result = await response.json()
      setData(result)
    } catch (err: any) {
      setError(err.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === 'loading') return

    if (session?.user) {
      fetchData()
    } else {
      setLoading(false)
      setError('Please sign in to access this page')
    }
  }, [session, status])

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-black dark:text-white" />
          <p className="text-black/60 dark:text-white/60">Loading data...</p>
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-red-600">Access Denied</CardTitle>
            <CardDescription>{error || 'You need to be signed in to access this page'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/login">
              <Button className="w-full">Sign In</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">Go Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="border-b border-black/10 dark:border-white/10 sticky top-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-black/80">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4">
              <Shield className="h-8 w-8 text-black dark:text-white" />
              <div>
                <h1 className="text-xl font-bold tracking-tight text-black dark:text-white">ADMIN LOGS</h1>
                <p className="text-xs text-black/60 dark:text-white/60">User Analytics Dashboard</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/5 dark:bg-white/5 rounded border border-black/10 dark:border-white/10">
                <User className="h-4 w-4 text-black dark:text-white" />
                <span className="text-xs text-black dark:text-white">{user.email}</span>
              </div>
              <Button onClick={handleSignOut} variant="outline" size="sm">
                Sign Out
              </Button>
              <Button onClick={fetchData} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Users</CardDescription>
              <CardTitle className="text-3xl">{data?.stats.totalAuthUsers || 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <Users className="h-4 w-4 text-black/40 dark:text-white/40" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Newsletter Subscribers</CardDescription>
              <CardTitle className="text-3xl">{data?.stats.totalSubscribers || 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <Mail className="h-4 w-4 text-black/40 dark:text-white/40" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Active Subscribers</CardDescription>
              <CardTitle className="text-3xl">{data?.stats.activeSubscribers || 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <TrendingUp className="h-4 w-4 text-black/40 dark:text-white/40" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Recent Comments</CardDescription>
              <CardTitle className="text-3xl">{data?.stats.recentComments || 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <MessageSquare className="h-4 w-4 text-black/40 dark:text-white/40" />
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different data views */}
        <Tabs defaultValue="subscribers" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
            <TabsTrigger value="subscribers">Newsletter Subscribers</TabsTrigger>
            <TabsTrigger value="users">Registered Users</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          {/* Newsletter Subscribers Tab */}
          <TabsContent value="subscribers">
            <Card>
              <CardHeader>
                <CardTitle>Newsletter Subscribers</CardTitle>
                <CardDescription>All users who subscribed to the newsletter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.subscribers && data.subscribers.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-black/10 dark:border-white/10">
                            <th className="text-left py-3 px-4 text-sm font-medium text-black/60 dark:text-white/60">Email</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-black/60 dark:text-white/60">Subscribed</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-black/60 dark:text-white/60">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.subscribers.map((subscriber: any) => (
                            <tr key={subscriber.id} className="border-b border-black/5 dark:border-white/5">
                              <td className="py-3 px-4 text-sm text-black dark:text-white">{subscriber.email}</td>
                              <td className="py-3 px-4 text-sm text-black/60 dark:text-white/60">
                                {formatDistanceToNow(new Date(subscriber.subscribed_at), { addSuffix: true })}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`text-xs px-2 py-1 rounded ${subscriber.active ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                                  {subscriber.active ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-center py-8 text-black/40 dark:text-white/40">No subscribers yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Registered Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Registered Users</CardTitle>
                <CardDescription>Users who created an account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.authUsers && data.authUsers.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-black/10 dark:border-white/10">
                            <th className="text-left py-3 px-4 text-sm font-medium text-black/60 dark:text-white/60">Email</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-black/60 dark:text-white/60">Categories</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-black/60 dark:text-white/60">Notifications</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-black/60 dark:text-white/60">Last Sign In</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-black/60 dark:text-white/60">Created</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.authUsers.map((user: any) => (
                            <tr key={user.id} className="border-b border-black/5 dark:border-white/5">
                              <td className="py-3 px-4 text-sm text-black dark:text-white">
                                <div className="flex flex-col">
                                  <span>{user.email}</span>
                                  {user.email_confirmed_at && (
                                    <span className="text-xs text-green-600 dark:text-green-400">✓ Verified</span>
                                  )}
                                </div>
                              </td>
                              <td className="py-3 px-4 text-sm text-black/60 dark:text-white/60">
                                {user.preferences?.categories?.join(', ') || 'Not set'}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`text-xs px-2 py-1 rounded ${user.preferences?.notification_enabled ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-gray-500/10 text-gray-600 dark:text-gray-400'}`}>
                                  {user.preferences?.notification_enabled ? 'Enabled' : 'Disabled'}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-sm text-black/60 dark:text-white/60">
                                {user.last_sign_in_at ? formatDistanceToNow(new Date(user.last_sign_in_at), { addSuffix: true }) : 'Never'}
                              </td>
                              <td className="py-3 px-4 text-sm text-black/60 dark:text-white/60">
                                {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-center py-8 text-black/40 dark:text-white/40">No registered users yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recent Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest comments and user interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.recentActivity && data.recentActivity.length > 0 ? (
                    <div className="space-y-3">
                      {data.recentActivity.map((activity: any, index: number) => (
                        <div key={index} className="p-4 border border-black/10 dark:border-white/10 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <MessageSquare className="h-5 w-5 text-black/40 dark:text-white/40" />
                              <div>
                                <p className="text-sm font-medium text-black dark:text-white">
                                  {activity.user_name || activity.user_email || 'Anonymous'}
                                </p>
                                <p className="text-xs text-black/60 dark:text-white/60">
                                  {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-black/40 dark:text-white/40">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}


